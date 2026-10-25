from django.db import models
from accounts.models import User


# Create your models here.
class FoodListing(models.Model):
    food_name = models.CharField(max_length=100)
    food_type= models.CharField(max_length=50)  
    description = models.TextField()
    quantity = models.PositiveIntegerField()

    quantity_unit = models.CharField(max_length=20, default='kg')  # ✅ NAYA

    address = models.CharField(max_length=255)
    pickup_time = models.DateTimeField()
    image= models.ImageField(upload_to='food_images/', blank=True)
    expiration_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=[('available', 'Available'), ('claimed', 'Claimed'),('completed', 'Completed')], default='available')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  # ✅ NAYA
    donor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='food_listings')

    def __str__(self):
        return self.food_name
class Donation(models.Model):
    food = models.ForeignKey(FoodListing, on_delete=models.CASCADE, related_name='donations')
    quantity = models.PositiveIntegerField()
    
    status = models.CharField(max_length=20, choices=[('unclaimed', 'Unclaimed'), ('claimed', 'Claimed'), ('completed', 'Completed'), ('cancelled', 'Cancelled')], default='unclaimed')
    created_at = models.DateTimeField(auto_now_add=True)
    receiver_id=models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_donations')

    def __str__(self):
         return f"Donation of {self.quantity_donated} for {self.food.food_name} by {self.receiver_id.username}"
class Feedback(models.Model):
    donation = models.OneToOneField(Donation,on_delete=models.CASCADE,related_name='feedback')

    rating = models.PositiveIntegerField()
    comments = models.TextField(blank=True)
    feedback_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback for {self.donation.food.food_name}"


    



# ✅ NAYA MODEL: NOTIFICATION
class Notification(models.Model):
    NOTIFICATION_TYPES = (
        ('FOOD_LISTED', 'Food Listed'),
        ('FOOD_CLAIMED', 'Food Claimed'),
        ('DELIVERY_ASSIGNED', 'Delivery Assigned'),
        ('FEEDBACK_RECEIVED', 'Feedback Received'),
    )

    receiver = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='notifications',
        help_text="The user who will receive this notification"
    )
    sender = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='sent_notifications',
        help_text="The user who triggered this notification"
    )
    title = models.CharField(max_length=255)
    message = models.TextField()
    notification_type = models.CharField(max_length=50, choices=NOTIFICATION_TYPES)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at'] # Latest sabse pehle aayen
        indexes = [
            models.Index(fields=['receiver', 'is_read']), # Fast fetching for unread count
        ]

    def __str__(self):
        return f"To: {self.receiver.username} | {self.title} | Read: {self.is_read}"
    

