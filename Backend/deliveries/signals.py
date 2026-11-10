from django.db.models.signals import post_save
from django.dispatch import receiver
from donations.models import Donation
from .models import Delivery

@receiver(post_save, sender=Donation)
def create_delivery_on_donation(sender, instance, created, **kwargs):
    # Agar nayi Donation bani hai
    if created:
        # Automatically Delivery create karein
        Delivery.objects.create(donation=instance, status='unassigned')
        print(f"✅ Delivery automatically created for Donation #{instance.id}")