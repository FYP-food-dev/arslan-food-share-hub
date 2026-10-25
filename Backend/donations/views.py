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