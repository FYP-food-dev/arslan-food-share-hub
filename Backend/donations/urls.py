from django.urls import path
from .views import (
    FoodListingCreateView,
    MyListingsView,
    FoodListingDetailView,


    NotificationListView,
    MarkNotificationReadView, 
    MarkAllNotificationsReadView
)

urlpatterns = [
    path(
        'food-listings/',
        FoodListingCreateView.as_view(),
        name='create-listing'
    ),
    path(
        'my-listings/',
        MyListingsView.as_view(),
        name='my-listings'
    ),
    path(
        'food-listings/<int:pk>/',
        FoodListingDetailView.as_view(),
        name='listing-detail'
    ),






    # ✅ Notification Endpoints
    path('notifications/', NotificationListView.as_view(), name='notification-list'),
    path('notifications/<int:pk>/read/', MarkNotificationReadView.as_view(), name='notification-read'),
    path('notifications/read-all/', MarkAllNotificationsReadView.as_view(), name='notification-read-all'),

]






