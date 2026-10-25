from django.contrib import admin

from accounts.models import  Role, User,DonorProfile,ReceiverProfile,RiderProfile


# Register your models here.
admin.site.register(User)
admin.site.register(Role)
admin.site.register(DonorProfile)
admin.site.register(ReceiverProfile)
admin.site.register(RiderProfile)



