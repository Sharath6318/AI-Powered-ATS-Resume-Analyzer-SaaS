from rest_framework import serializers

from resume_analyzer_application import models
from resume_analyzer_application.models import ResumeAnalysis
from resume_analyzer_application.models import Resume
from rest_framework.response import Response

class UserSerializer(serializers.ModelSerializer):

    class Meta:

        model = models.User

        fields = ['id', 'username', 'email', 'password' ,'credits', 'is_premium', 'plan', 'organization', 'is_org_owner']

        read_only_fields = ['is_premium', 'credits', 'plan']

        extra_kwargs = {
            'password' : {'write_only' : True}
        }

    def create(self, validated_data):

        return models.User.objects.create_user(**validated_data)
    


class OrganizationSerializer(serializers.ModelSerializer):

    class Meta:

        model =  models.Organization

        fields = '__all__'

class ResumeAnalysisSerializer(serializers.ModelSerializer):

    file_name = serializers.SerializerMethodField()

    parsed_text = serializers.SerializerMethodField()

    class Meta:

        model = models.ResumeAnalysis

        fields = "__all__"

        read_only_fields = ['id', 'created_at']

    def get_file_name(self, obj):

        import os

        return os.path.basename(obj.resume.file.name)
    
    def get_parsed_text(self, obj):

        split_parsed_text = obj.resume.parsed_text.split('\n')

        return split_parsed_text

        # resume = Resume.objects.filter(id = obj.resume.id)
        
        # serializer_inst = ResumeSerializer(resume, many = True)

        # return Response(data=serializer_inst.data)

    


class ResumeSerializer(serializers.ModelSerializer):

    analyze = ResumeAnalysisSerializer(source='analysis', read_only=True)

    class Meta:

        model = models.Resume

        fields = '__all__'

        read_only_fields = ['user', 'parsed_text', 'id','uploaded_at']



class SubscriptionsSerializer(serializers.ModelSerializer):

    class Meta:

        model = models.Subscription

        fields = '__all__'

        read_only_fields = ['id', 'created_at']

class MyplanSerializer(serializers.ModelSerializer):

    class Meta:

        model = models.MyPlan

        fields = '__all__'

        read_only_fields = ['id', 'created_at', 'updated_at']


class UsageSerializer(serializers.ModelSerializer):

    class Meta:

        model = models.Usages

        fields = '__all__'

        read_only_fields = ['id', 'created_at']

class JobSerializer(serializers.ModelSerializer):

    class Meta:

        model = models.JobDescription

        fields = '__all__'

        read_only_fields = ['id', 'user', 'created_at', 'updated_at']






