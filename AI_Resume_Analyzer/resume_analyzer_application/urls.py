"""
URL configuration for AI_Resume_Analyzer project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter

from resume_analyzer_application import views

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()

router.register('register', views.RegisterView)
router.register('organization', views.OrganizationView)
router.register('resume', views.ResumesView)#......................................
# router.register('resume-analyze', views.ResuemAnalyzeView)
router.register('job-description', views.JobDescriptionView)


urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('resume-summary/',views.ResumeSummaryView.as_view()),
    path('resume/<int:pk>/analyze/',views.ResuemAnalyzeView.as_view()),
    path('resume-analyzes/', views.ListResumeAnalyze.as_view()),
    path('Me/', views.CurrentUserView.as_view()),
    path('create-payment/', views.CreatePaymentAPIView.as_view()),
    path('payment-success/', views.PaymentSucessView.as_view()),
    path('updatesubscription/', views.SubscriptionUpdateView.as_view()),
    path('setplan/', views.SetPlanView.as_view()),
    path('get-plan/', views.PlanListView.as_view()),
    path('all-sub/', views.SubscriptionListView.as_view()),
    path('usages/', views.UsagesListView.as_view()),
    path('credits-smry/', views.CreditsSummaryView.as_view())
]