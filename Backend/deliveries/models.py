from django.db import models
from donations.models import Donation
from donations.models import User

# Create your models here.
class Delivery(models.Model):
    donation = models.OneToOneField(Donation, on_delete=models.CASCADE, related_name='delivery')
    rider = models.ForeignKey(User, on_delete=models.CASCADE, related_name='deliveries')
    status = models.CharField(max_length=20, choices=[('unassigned', 'UnAssigned'), ('assigned', 'Assigned'), ('picked_up', 'Picked Up'), ('out_for_delivery', 'Out for Delivery'),('delivered', 'Delivered'),('cancelled', 'Cancelled')], default='unassigned')

    created_at = models.DateTimeField(auto_now_add=True)
    delivery_time = models.DateTimeField(null=True, blank=True)
    cancellation_reason = models.TextField(null=True, blank=True)
    food_location = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"Delivery of {self.donation.food.food_name} by {self.rider.username}"
class Handover(models.Model):

    donation = models.ForeignKey(Donation,on_delete=models.CASCADE,related_name='handovers')
    from_rider = models.ForeignKey(User,on_delete=models.CASCADE,related_name='handovers_given')
    to_rider = models.ForeignKey(User,on_delete=models.CASCADE,related_name='handovers_received')
    handover_location = models.CharField(max_length=255)
    from_rider_confirmed = models.BooleanField(default=False)
    to_rider_confirmed = models.BooleanField(default=False)
    status = models.CharField(max_length=20,choices=[('pending', 'Pending'),('completed', 'Completed'),('failed', 'Failed'),],default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Handover for Donation {self.donation.id}"