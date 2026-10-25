from rest_framework import serializers
from .models import User, Role,DonorProfile,RiderProfile,ReceiverProfile
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    role = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role']

    def create(self, validated_data):
        role_name = validated_data.pop('role')

        if role_name.lower() == 'admin':
            raise serializers.ValidationError(
                {'role': 'Admin registration is not allowed.'}
            )

        try:
            role = Role.objects.get(name__iexact=role_name)
        except Role.DoesNotExist:
            raise serializers.ValidationError(
                {'role': 'Invalid role.'}
            )

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        user.roles.add(role)

        return user
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'phone',
            'address',
            'profile_picture',]

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    def validate(self,attrs):
        email=attrs["email"]
        password=attrs["password"]
        user=authenticate(
           
            email=email,password=password)
        if not user:
            raise serializers.ValidationError(
                "Invalid email or password."
            )

        refresh = RefreshToken.for_user(user)
        roles = user.roles.values_list("name", flat=True)
        attrs["user"] = user
        attrs["roles"] = list(roles)
        attrs["refresh"] = str(refresh)
        attrs["access"] = str(refresh.access_token)
        return attrs
class DonorProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = DonorProfile
        fields = [
            'organization',
            'organization_address',
        ]
class RiderProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiderProfile
        fields = [
            'vehicle_type',
            'vehicle_number',
            'availability',
        ]
class ReceiverProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReceiverProfile
        fields = []