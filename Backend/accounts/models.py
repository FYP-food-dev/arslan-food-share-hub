from django.db import models
from django.contrib.auth.models import AbstractUser

class Role(models.Model):
    
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
class User(AbstractUser):

    email = models.EmailField(unique=True)

    phone = models.CharField(max_length=20, blank=True)

    address = models.CharField(max_length=255, blank=True)

    profile_picture = models.ImageField(
        upload_to='profile_pictures/',
        blank=True
    )

    roles = models.ManyToManyField(
        Role,
        related_name='users'
    )

    def __str__(self):
        return self.username

    
class DonorProfile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    organization = models.CharField(max_length=150)

    organization_address = models.CharField(max_length=255)

    def __str__(self):
        return self.user.username

class ReceiverProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.user.username
class RiderProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    vehicle_type = models.CharField(max_length=50)

    vehicle_number = models.CharField(
        max_length=20,
        unique=True
    )

    availability = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username