# from django.shortcuts import render

# # Create your views here.




from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Delivery
from .serializers import DeliverySerializer

# ✅ 1. Available Deliveries (Rider ko unassigned deliveries dikhana)
class AvailableDeliveriesView(generics.ListAPIView):
    serializer_class = DeliverySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Sirf woh deliveries jinka koi rider nahi hai aur jo pending/unassigned hain
        return Delivery.objects.filter(status='unassigned')

# ✅ 2. Accept Delivery (Rider delivery accept kare)
class AcceptDeliveryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            # Delivery dhoondein jo abhi unassigned ho
            delivery = Delivery.objects.get(pk=pk, status='unassigned')
            
            # Rider assign karein aur status update karein
            delivery.rider = request.user
            delivery.status = 'assigned'
            delivery.save()

            return Response(
                {"message": "Delivery accepted successfully!", "delivery_id": delivery.id}, 
                status=status.HTTP_200_OK
            )
        except Delivery.DoesNotExist:
            return Response(
                {"error": "Delivery not found or already assigned to someone else."}, 
                status=status.HTTP_404_NOT_FOUND
            )

# ✅ 3. My Deliveries (Rider apni accepted deliveries dekhe)
class MyDeliveriesView(generics.ListAPIView):
    serializer_class = DeliverySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Delivery.objects.filter(rider=self.request.user)

# ✅ 4. Update Delivery Status (Rider status change kare: picked_up, delivered)
class UpdateDeliveryStatusView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        try:
            # Check karein ke delivery usi rider ki hai
            delivery = Delivery.objects.get(pk=pk, rider=request.user)
            new_status = request.data.get('status')

            # Allowed statuses (jo rider change kar sakta hai)
            if new_status in ['picked_up', 'out_for_delivery', 'delivered']:
                delivery.status = new_status
                
                # Agar delivered ho gaya, toh delivery_time save karein
                if new_status == 'delivered':
                    from django.utils import timezone
                    delivery.delivery_time = timezone.now()
                    
                    # ✅ Donation ka status bhi 'completed' kar dein
                    delivery.donation.status = 'completed'
                    delivery.donation.save()

                delivery.save()
                return Response({"message": f"Status updated to {new_status}"}, status=status.HTTP_200_OK)
            
            return Response({"error": "Invalid status update."}, status=status.HTTP_400_BAD_REQUEST)

        except Delivery.DoesNotExist:
            return Response({"error": "Delivery not found or unauthorized."}, status=status.HTTP_404_NOT_FOUND)