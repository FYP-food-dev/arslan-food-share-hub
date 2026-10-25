from django.contrib import admin

from donations.models import Donation, Feedback, FoodListing, Notification

# Register your models here.
admin.site.register(Donation)
admin.site.register(Feedback)
admin.site.register(FoodListing)
admin.site.register(Notification)