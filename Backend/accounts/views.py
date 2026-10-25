from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import User,DonorProfile,ReceiverProfile,RiderProfile
from .serializer import RegisterSerializer,LoginSerializer,UserSerializer,ReceiverProfileSerializer,DonorProfileSerializer,RiderProfileSerializer
# Create your views here.
@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(
        data=request.data,
        context={'request': request}
    )

    serializer.is_valid(raise_exception=True)

    user = serializer.validated_data["user"]

    return Response({
        "user": UserSerializer(user).data,
        "roles": serializer.validated_data["roles"],
        "access": serializer.validated_data["access"],
        "refresh": serializer.validated_data["refresh"],
    })
@api_view(['GET','POST','PATCH'])
@permission_classes([IsAuthenticated])
def profile(request):
    print("Method:", request.method)
    print("User:", request.user)
    print("Authenticated:", request.user.is_authenticated)
    role = request.query_params.get('role')
    if not role:
         return Response(
             {"detail":"Role is required"},
             status=400
        )
    if not request.user.roles.filter(name=role).exists():
        return Response(
            {'detail':"You do not have this role"},
            status=403
        )
    
    profile_map = {
        "Donor": (DonorProfile, DonorProfileSerializer),
        "Receiver": (ReceiverProfile, ReceiverProfileSerializer),
        "Rider": (RiderProfile, RiderProfileSerializer),
    }
    if role not in profile_map:
        return Response(
            {"detail":"Invalid profile role"},
            status=400
        )
    profile_model,profile_serializer=profile_map[role]
    empty_profile_data = {
    "Donor": {
        "organization": "",
        "organization_address": "",
    },

    "Receiver": {},

    "Rider": {
        "vehicle_type": "",
        "vehicle_number": "",
        "availability": False,
    }
}
    if request.method=="GET":
        try:
            profile=profile_model.objects.get(user=request.user)
            user_data=UserSerializer(request.user).data
            profile_data=profile_serializer(profile).data
            response_data={
                **user_data,
                **profile_data
            }
            return Response({
                "exist":True,
                'profile':response_data
            })
        except profile_model.DoesNotExist:
            user_data=UserSerializer(request.user).data
            profile_data=empty_profile_data[role]
            response_data={
                **user_data,
                **profile_data
            }
            return Response({
                 "exists":False,
                 'profile':response_data
            })
    if request.method == "POST":

        user_serializer = UserSerializer(
        request.user,
        data=request.data,
        partial=True
    )

        profile_serializer_instance = profile_serializer(
        data=request.data
    )

        user_serializer.is_valid(raise_exception=True)
        profile_serializer_instance.is_valid(raise_exception=True)

        user_serializer.save()

        profile = profile_model.objects.create(
        user=request.user,
        **profile_serializer_instance.validated_data
    )

        return Response({
        "exists": True,
        "profile": {
            **UserSerializer(request.user).data,
            **profile_serializer(profile).data
        }
        }, status=201)
    if request.method == 'PATCH':
        profile=profile_model.objects.get(user=request.user)
        user_serializer=UserSerializer(
            request.user,
            data=request.data,
            partial=True
        )
        profile_serializer_instance = profile_serializer(
                profile,
                data=request.data,
                partial=True
            )
        user_serializer.is_valid(raise_exception=True)
        profile_serializer_instance.is_valid(raise_exception=True)
        user_serializer.save()
        profile_serializer_instance.save()
        return Response(
            {
            'exists':True,
            'profile':{
            **UserSerializer(request.user).data,
            **profile_serializer(profile).data
            }
            }
        )