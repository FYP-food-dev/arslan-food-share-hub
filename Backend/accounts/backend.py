from .models import User

class EmailBackend:
    def authenticate(self,request,email,password):
        try:
            user=User.objects.get(email=email)
        except User.DoesNotExist:
            return None
        if user.check_password(password) and user.is_active:
            return user
        return None