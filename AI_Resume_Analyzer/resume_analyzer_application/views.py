from django.shortcuts import render
from django.db.models import Avg, Sum


from datetime import date, timedelta

from rest_framework import status

import razorpay

from resume_analyzer_application.serializers import (
    UserSerializer,
    OrganizationSerializer,
    ResumeSerializer,
    ResumeAnalysisSerializer,
    JobSerializer,
    SubscriptionsSerializer,
    UsageSerializer,
    MyplanSerializer,
)
from resume_analyzer_application.models import (
    User,
    Organization,
    Resume,
    ResumeAnalysis,
    JobDescription,
    Subscription,
    Usages,
    MyPlan,
)
from resume_analyzer_application.get_parsed_text import extract_text
from resume_analyzer_application.analyze_resume import analyze_resume_with_gemini

from rest_framework import authentication, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView


class RegisterView(ModelViewSet):

    serializer_class = UserSerializer

    queryset = User.objects.all()


class CurrentUserView(APIView):

    authentication_classes = [JWTAuthentication]

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):

        user = request.user

        userdata = {"username": user.username, "email": user.email, "plan": user.plan}

        return Response(data=userdata)


class OrganizationView(ModelViewSet):

    authentication_classes = [JWTAuthentication]

    permission_classes = [permissions.IsAuthenticated]

    serializer_class = OrganizationSerializer

    queryset = Organization.objects.all()


# ......................UPLOAD Resume........................


class ResumesView(ModelViewSet):

    authentication_classes = [JWTAuthentication]

    permission_classes = [permissions.IsAuthenticated]

    serializer_class = ResumeSerializer

    queryset = Resume.objects.all()

    def get_queryset(self):

        return Resume.objects.filter(user=self.request.user)

    def perform_create(self, serializer):

        if self.request.user.credits < 1:

            raise ValidationError(
                {"error": "Insufficient credits. Please upgrade your plan."}
            )

        resume = serializer.save(user=self.request.user)

        text = extract_text(resume.file)

        resume.parsed_text = text

        resume.save()

        self.request.user.credits -= 1
        self.request.user.save()

        Usages.objects.create(
            user=self.request.user,
            action="resume_upload",
            resource=resume.file.name,
            credits_used=1,
            status="success",
        )


# ...................... RESUME ANALYZE.......................


class ResuemAnalyzeView(APIView):

    authentication_classes = [JWTAuthentication]

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):

        if request.user.credits < 5:

            return Response(
                {"error": "Insufficient credits. Please upgrade your plan"}, status=400
            )

        else:

            resume_id = kwargs.get("pk")

            try:

                resume = Resume.objects.get(id=resume_id, user=request.user)

            except Resume.DoesNotExist:

                return Response({"error": "Resume not found"}, status=404)

            job_id = request.data.get("job_description_id")

            if not job_id:

                return Response({"error": "Job description required"}, status=400)

            try:

                job = JobDescription.objects.get(id=job_id, user=request.user)

            except JobDescription.DoesNotExist:

                return Response({"error": "Job description not found"}, status=404)

            # Prevent duplicate analysis
            if hasattr(resume, "analysis"):

                serializer = ResumeAnalysisSerializer(resume.analysis)

                return Response(serializer.data)

            try:

                result = analyze_resume_with_gemini(resume.parsed_text, job.description)

                score = result.get("score", 0)

                if score >= 85:

                    matching_rate = "Excellent Matching"

                elif score >= 70:

                    matching_rate = "Good Matching"

                elif score >= 50:

                    matching_rate = "Average Matching"

                else:

                    matching_rate = "Poor Matching"

                result["matching_rate"] = matching_rate

                Usages.objects.create(
                    user=request.user,
                    action="resume_analysis",
                    resource=resume.file,
                    credits_used=5,
                    status="success",
                )

                request.user.credits -= 5
                request.user.save()

            except ValidationError as e:
                return Response(
                    {"error": str(e)},
                    status=400
                )

            except Exception as e:
                return Response({"error": str(e)}, status=500)

            analyze = ResumeAnalysis.objects.create(
                resume=resume,
                ats_score=result.get("score", 0),
                score_breakdown=result.get("score_breakdown", []),
                matching_rates=matching_rate,
                matching_keywords={
                    "matched": result.get("matching_keywords", []),
                    "missing": result.get("missing_keywords", []),
                },
                suggestions={
                    "strengths": result.get("strengths", []),
                    "weaknesses": result.get("weaknesses", []),
                    "improvements": result.get("suggestions", []),
                },
            )

            serializer = ResumeAnalysisSerializer(analyze)

            return Response(serializer.data, status=201)


class ListResumeAnalyze(ListAPIView):

    authentication_classes = [JWTAuthentication]

    permission_classes = [permissions.IsAuthenticated]

    serializer_class = ResumeAnalysisSerializer

    def get_queryset(self):

        return ResumeAnalysis.objects.filter(resume__user=self.request.user)


client = razorpay.Client(auth=("rzp_test_StZBNznMkg26Hn", "Nrsx79AE70hW0NjOdgxhfCNN"))


class CreatePaymentAPIView(APIView):

    authentication_classes = [JWTAuthentication]

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):

        cur_amount = request.data.get("price")

        payment = client.order.create(
            {"amount": int(cur_amount * 100), "currency": "INR", "payment_capture": 1}
        )

        return Response(payment)


class PaymentSucessView(APIView):

    authentication_classes = [JWTAuthentication]

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):

        order_id = request.data.get("razorpay_order_id")
        cur_plan = request.data.get("plan")

        subscription = Subscription.objects.create(
            user=self.request.user,
            plan=cur_plan,
            start_date=date.today(),
            end_date=date.today() + timedelta(days=30),
            is_valid=True,
            razorpay_order_id=order_id,
        )

        request.user.is_premium = True
        request.user.plan = cur_plan

        if cur_plan == "pro":

            request.user.credits += 100

        elif cur_plan == "enterprise":

            request.user.credits += 500

        request.user.save()

        return Response(
            {
                "message": "Subscription Activated",
                "plan": subscription.plan,
                "start_data": subscription.start_date,
                "end_data": subscription.end_date,
            }
        )


class SetPlanView(APIView):

    authentication_classes = [JWTAuthentication]

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):

        plan = request.data.get("plan")

        MyPlan.objects.update_or_create(
            user=request.user,  
            defaults={
            "plan": plan
            }
        )

        return Response({"message": "plan updated"})


class PlanListView(APIView):

    authentication_classes = [JWTAuthentication]

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):

        plans = MyPlan.objects.filter(user = request.user)

        serializer = MyplanSerializer(plans, many = True)

        return Response(data=serializer.data)


class SubscriptionUpdateView(APIView):

    authentication_classes = [JWTAuthentication]

    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request):

        subscription = Subscription.objects.filter(user=request.user).first()

        if not subscription:

            return Response({"error": "No subscription found"}, status=404)

        subscription.start_date = date.today()
        subscription.end_date = date.today() + timedelta(days=30)

        subscription.save()

        return Response({"message": "Updated"})


class SubscriptionListView(APIView):

    authentication_classes = [JWTAuthentication]

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):

        allSubscriptions = Subscription.objects.filter(user=request.user)

        serializer = SubscriptionsSerializer(allSubscriptions, many=True)

        return Response(data=serializer.data)


class ResumeSummaryView(APIView):

    authentication_classes = [JWTAuthentication]

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):

        resume_count = Resume.objects.filter(user=request.user).count()

        jobdescription_count = JobDescription.objects.filter(user=request.user).count()

        average_score = ResumeAnalysis.objects.filter(
            resume__user=request.user
        ).aggregate(avg_ats=Avg("ats_score"))

        avilable_credits = request.user.credits

        data = {
            "resume_count": resume_count,
            "jobdescription_count": jobdescription_count,
            "average_ats_score": round(average_score["avg_ats"] or 0),
            "avilable_credits": avilable_credits,
        }

        return Response(data=data)


# ...............JOBDESCRIPTION.........................
class JobDescriptionView(ModelViewSet):

    authentication_classes = [JWTAuthentication]

    permission_classes = [permissions.IsAuthenticated]

    serializer_class = JobSerializer

    queryset = JobDescription.objects.all()

    def get_queryset(self):

        return JobDescription.objects.filter(user=self.request.user)

    def perform_create(self, serializer):

        if self.request.user.credits < 1:

            raise ValidationError("Insufficient credits. Please upgrade your plan🕷️")

        job = serializer.save(user=self.request.user)

        Usages.objects.create(
            user=self.request.user,
            action="job_description",
            resource=job.title,
            credits_used=1,
            status="success",
        )

        self.request.user.credits -= 1
        self.request.user.save()


class UsagesListView(APIView):

    authentication_classes = [JWTAuthentication]

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):

        usage = Usages.objects.filter(user=request.user)

        serializser_inst = UsageSerializer(usage, many=True)

        return Response(data=serializser_inst.data)


class CreditsSummaryView(APIView):

    authentication_classes = [JWTAuthentication]

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):

        credits_used = Usages.objects.filter(user=request.user).aggregate(
            used_credits=Sum("credits_used")
        )["used_credits"]

        credits_left = request.user.credits

        total_action = Usages.objects.filter(user=request.user).count()

        data = {
            "used_credits": credits_used,
            "remaining_credists": credits_left,
            "total_action": total_action,
        }

        return Response(data=data)
