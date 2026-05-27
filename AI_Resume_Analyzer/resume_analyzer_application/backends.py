from django.contrib.auth.backends import ModelBackend, BaseBackend

from resume_analyzer_application.models import User

class EmailBackend(BaseBackend):

    def authenticate(self, request, username = ..., password = ..., **kwargs):

        try:

            userObject = User.objects.get(email = username)

            if userObject.check_password(password):

                return userObject
            
            else:

                return None

        except:

            return None


    def get_user(self, user_id):
        return User.objects.get(id = user_id)
