from django.urls import path
from .views import (
    AvailableDeliveriesView, 
    AcceptDeliveryView, 
    MyDeliveriesView, 
    UpdateDeliveryStatusView
)

urlpatterns = [
    path('available/', AvailableDeliveriesView.as_view(), name='available-deliveries'),
    path('<int:pk>/accept/', AcceptDeliveryView.as_view(), name='accept-delivery'),
    path('my-deliveries/', MyDeliveriesView.as_view(), name='my-deliveries'),
    path('<int:pk>/update-status/', UpdateDeliveryStatusView.as_view(), name='update-delivery-status'),
]