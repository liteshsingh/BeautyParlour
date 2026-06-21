from django.urls import path, include
from rest_framework.routers import SimpleRouter

from app.views import (
    AppointmentViewSet,
    ServiceViewSet,
    LocationViewSet,
    WebsiteSettingsViewSet,
    login,
    register,
)

router = SimpleRouter(trailing_slash=False)

router.register(
    r'appointments',
    AppointmentViewSet,
    basename='appointment'
)

router.register(
    r'beauty-services',
    ServiceViewSet,
    basename='beauty-service'
)

router.register(
    r'locations',
    LocationViewSet,
    basename='location'
)

router.register(
    r'website-settings',
    WebsiteSettingsViewSet,
    basename='website-settings'
)

urlpatterns = [
    path('', include(router.urls)),

    path(
        'auth/login',
        login,
        name='login'
    ),

    path(
        'auth/register',
        register,
        name='register'
    ),
]