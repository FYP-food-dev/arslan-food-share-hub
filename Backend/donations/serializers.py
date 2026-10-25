from rest_framework import serializers
from django.utils import timezone
from .models import FoodListing, Notification


class FoodListingSerializer(serializers.ModelSerializer):
    donor_name = serializers.CharField(source='donor.username', read_only=True)
    donor_email = serializers.CharField(source='donor.email', read_only=True)

    class Meta:
        model = FoodListing
        fields = [
            'id',
            'donor',
            'donor_name',
            'donor_email',
            'food_name',
            'food_type',
            'description',
            'quantity',
            'quantity_unit',
            'address',
            'pickup_time',
            'image',
            'expiration_date',
            'status',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'donor', 'status', 'created_at', 'updated_at']

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Quantity must be greater than 0."
            )
        return value

    def validate_pickup_time(self, value):
        if value < timezone.now():
            raise serializers.ValidationError(
                "Pickup time cannot be in the past."
            )
        return value

    def validate_expiration_date(self, value):
        if value < timezone.now():
            raise serializers.ValidationError(
                "Expiration date cannot be in the past."
            )
        return value

    def validate(self, data):
        pickup_time = data.get('pickup_time')
        expiration_date = data.get('expiration_date')

        if pickup_time and expiration_date:
            if pickup_time > expiration_date:
                raise serializers.ValidationError(
                    "Pickup time cannot be after expiration date."
                )
        return data
    








class NotificationSerializer(serializers.ModelSerializer):
    # Sender ka naam nikalne ke liye (Agar sender null ho toh "System" dikhaye)
    sender_name = serializers.CharField(source='sender.username', read_only=True, default="System")

    class Meta:
        model = Notification
        fields = [
            'id', 'title', 'message', 'notification_type', 
            'is_read', 'created_at', 'sender_name'
        ]