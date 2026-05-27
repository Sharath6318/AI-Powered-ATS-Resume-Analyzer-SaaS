import os

from django.db import models

from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator


class Organization(models.Model):

    name = models.CharField(max_length=255)

class User(AbstractUser):

    credits = models.PositiveIntegerField(default=3)

    is_premium = models.BooleanField(default=False)

    plan = models.CharField(max_length=200, blank=True, default='free')

    organization = models.ForeignKey(
        Organization, on_delete=models.SET_NULL, null=True, blank=True
    )
    
    is_org_owner = models.BooleanField(default=False)

    def __str__(self):
        
        return self.username



class Resume(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resumes')

    file = models.FileField(upload_to='resume', validators=[FileExtensionValidator(['pdf', 'docx'])])

    parsed_text = models.TextField(blank=True, null=True)

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} - Resume'
    
    class Meta:

        ordering = ['-uploaded_at']




class ResumeAnalysis(models.Model):

    resume = models.OneToOneField(Resume, on_delete=models.CASCADE, related_name='analysis')

    ats_score = models.IntegerField()

    score_breakdown = models.JSONField(default=list)

    matching_rates = models.CharField(default="Poor Matching")

    matching_keywords = models.JSONField()

    suggestions = models.JSONField()

    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:

        ordering = ['-created_at']

    def __str__(self):

        file_name = os.path.basename(self.resume.file.name)

        return f'{self.resume.user} - {file_name} - Score : {self.ats_score}'



class Subscription(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subscriptions')

    PLAN_CHOICES = (
        ('free', 'FREE'),
        ('pro', 'PRO'),
        ('enterprise', 'ENTERPRISE')
    )
    
    plan = models.CharField(max_length=100, choices= PLAN_CHOICES, default='free')

    start_date = models.DateField()

    end_date = models.DateField()

    is_valid = models.BooleanField(default=False)

    razorpay_order_id = models.CharField(max_length=255,blank=True,null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:

        ordering = ['-created_at']

    def __str__(self):
        return f'{self.user.username} - {self.plan}'
    
class MyPlan(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='myplan')

    plan = models.CharField(max_length=100, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

class Usages(models.Model):

    ACTION_CHOICES = (
        ('resume_upload', 'Resume Upload'),
        ('resume_analysis', 'Resume Analysis'),
        ('job_description', 'Job Description Added'),
        ('re_analysis', 'Re-Analysis'),
    )

    STATUS_CHOICES = (
        ('success', 'Success'),
        ('processing', 'Processing'),
        ('failed', 'Failed'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.CharField(max_length=50, choices=ACTION_CHOICES)
    resource = models.CharField(max_length=255)
    credits_used = models.IntegerField(default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

class JobDescription(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='job_descriptions')

    title = models.CharField(max_length=250)

    company_name = models.CharField(max_length=50, null=True, blank=True)

    tags = models.CharField(max_length=800, null=True, blank=True)

    description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    
















    

    
