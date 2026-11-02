from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import FoodListing
from .serializers import FoodListingSerializer
from .permissions import IsDonor, IsOwnerOrReadOnly
from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.views import APIView
from .serializers import DonationSerializer
from django.db import transaction
from .models import Donation


class FoodListingCreateView(generics.CreateAPIView):
    """
    POST /api/donations/food-listings/
    Donor nayi listing create kare.
    """
    serializer_class = FoodListingSerializer
    permission_classes = [permissions.IsAuthenticated, IsDonor]

    def perform_create(self, serializer):
        serializer.save(donor=self.request.user)


class MyListingsView(generics.ListAPIView):
    """
    GET /api/donations/my-listings/
    Donor apni saari listings dekhe.
    """
    serializer_class = FoodListingSerializer
    permission_classes = [permissions.IsAuthenticated, IsDonor]

    def get_queryset(self):
        return FoodListing.objects.filter(donor=self.request.user)


class FoodListingDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET    /api/donations/food-listings/{id}/
    PATCH  /api/donations/food-listings/{id}/
    DELETE /api/donations/food-listings/{id}/
    Sirf owner edit/delete kar sakta hai.
    """
    serializer_class = FoodListingSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsDonor,
        IsOwnerOrReadOnly,
    ]

    def get_queryset(self):
        return FoodListing.objects.filter(donor=self.request.user)

# 1. List Notifications
class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Sirf apni notifications dekh sakta hai, latest pehle
        return Notification.objects.filter(receiver=self.request.user)

# 2. Mark Single Notification as Read
class MarkNotificationReadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        try:
            # Sirf apni notification read kar sakta hai
            notification = Notification.objects.get(pk=pk, receiver=request.user)
            notification.is_read = True
            notification.save()
            return Response({"message": "Marked as read"}, status=status.HTTP_200_OK)
        except Notification.DoesNotExist:
            return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)

# 3. Mark All as Read
class MarkAllNotificationsReadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request):
        Notification.objects.filter(receiver=request.user, is_read=False).update(is_read=True)
        return Response({"message": "All marked as read"}, status=status.HTTP_200_OK)

# ✅ 1. Available Food API (Receiver ke liye)
class AvailableFoodListView(generics.ListAPIView):
    serializer_class = FoodListingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Sirf 'available' food dikhao, aur jo khud ki list ki hui na ho
        return FoodListing.objects.filter(status='available').exclude(donor=self.request.user)

# ✅ 2. Claim Food API (Sabse Important Logic)
class ClaimFoodView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            food = FoodListing.objects.get(pk=pk)

            # Check 1: Food available hai?
            if food.status != 'available':
                return Response({"error": "This food is already claimed."}, status=status.HTTP_400_BAD_REQUEST)

            # Check 2: User khud ka food claim toh nahi kar raha?
            if food.donor == request.user:
                return Response({"error": "You cannot claim your own food."}, status=status.HTTP_400_BAD_REQUEST)

            # Transaction Atomic: Taake data aadha na bane agar error aaye
            with transaction.atomic():
                # Donation Record Banayein
                donation = Donation.objects.create(
                    food=food,
                    receiver=request.user,
                    quantity=food.quantity, # Donation model ki demand hai
                    status='claimed'
                )

                # Food status 'claimed' karein
                food.status = 'claimed'
                food.save()

                # Donor ko Notification bhejein
                Notification.objects.create(
                    receiver=food.donor,
                    sender=request.user,
                    title="Food Claimed!",
                    message=f"{request.user.username} has claimed your {food.food_name}.",
                    notification_type='FOOD_CLAIMED'
                )

            return Response({"message": "Food claimed successfully!", "donation_id": donation.id}, status=status.HTTP_201_CREATED)

        except FoodListing.DoesNotExist:
            return Response({"error": "Food not found."}, status=status.HTTP_404_NOT_FOUND)

# ✅ 3. My Donations API (Receiver ki history)
class MyDonationsView(generics.ListAPIView):
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Donation.objects.filter(receiver=self.request.user)