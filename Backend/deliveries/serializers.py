from rest_framework import serializers
from .models import Delivery

class DeliverySerializer(serializers.ModelSerializer):
    # ✅ Donation ke andar se zaroori details nikalne ke liye
    food_name = serializers.CharField(source='donation.food.food_name', read_only=True)
    donor_name = serializers.CharField(source='donation.food.donor.username', read_only=True)
    receiver_name = serializers.CharField(source='donation.receiver.username', read_only=True)
    pickup_address = serializers.CharField(source='donation.food.address', read_only=True)
    receiver_address = serializers.CharField(source='donation.receiver.address', read_only=True)

    class Meta:
        model = Delivery
        fields = [
            'id', 
            'donation', 
            'food_name', 
            'donor_name', 
            'receiver_name', 
            'pickup_address', 
            'receiver_address',
            'rider', 
            'status', 
            'created_at', 
            'delivery_time', 
            'food_location'
        ]
        # Rider aur status user khud change nahi kar sakta (Backend handle karega)
        read_only_fields = ['id', 'rider', 'created_at', 'delivery_time']