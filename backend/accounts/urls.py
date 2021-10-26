from .views import UserViewSet

from django.urls import path, include
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r"users", UserViewSet, basename="User")

urlpatterns = router.urls
