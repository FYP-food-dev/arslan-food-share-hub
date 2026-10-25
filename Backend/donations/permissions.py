from rest_framework import permissions


class IsDonor(permissions.BasePermission):
    """
    Sirf Donor role wale users ko allow karein.
    """
    message = "Only donors can perform this action."

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.roles.filter(name='Donor').exists()
        )


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission:
    - Sirf owner edit/delete kar sakta hai.
    - Baqi log sirf read kar sakte hain.
    """
    message = "You can only edit or delete your own listings."

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.donor == request.user