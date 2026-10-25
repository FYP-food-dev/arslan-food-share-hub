from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import FoodListing, Notification
from accounts.models import User

@receiver(post_save, sender=FoodListing)
def create_notification_on_food_listing(sender, instance, created, **kwargs):
    # Agar nayi listing bani hai aur woh 'available' hai
    if created and instance.status == 'available':
        # Saare Receivers ko dhoondein
        receivers = User.objects.filter(roles__name='Receiver')
        
        notifications = []
        for receiver in receivers:
            notifications.append(
                Notification(
                    receiver=receiver,
                    sender=instance.donor,
                    title="New Food Available!",
                    message=f"{instance.donor.username} has listed {instance.food_name} ({instance.quantity} {instance.quantity_unit}).",
                    notification_type='FOOD_LISTED'
                )
            )
        # Bulk create use karein taake ek hi query mein saari notifications ban jayein
        Notification.objects.bulk_create(notifications)