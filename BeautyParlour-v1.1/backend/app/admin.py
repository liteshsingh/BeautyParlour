from django.contrib import admin

from app.models.models import (
    Appointment,
    Location,
    User,
    Service,
    WebsiteSettings,
)


# ==================================================
# APPOINTMENTS
# ==================================================

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "email",
        "phone",
        "service",
        "makeupType",
        "date",
        "time",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
        "date",
        "created_at",
    )

    search_fields = (
        "name",
        "email",
        "phone",
        "customer_address",
    )

    readonly_fields = (
        "id",
        "created_at",
        "updated_at",
    )


# ==================================================
# BEAUTY SERVICES
# ==================================================

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):

    list_display = (
        "makeup_type",
        "service_group",
        "price",
        "offer_price",
        "duration_minutes",
        "is_active",
        "created_at",
    )

    list_filter = (
        "service_group",
        "is_active",
        "created_at",
    )

    search_fields = (
        "makeup_type",
        "description",
    )

    readonly_fields = (
        "id",
        "created_at",
        "updated_at",
    )


# ==================================================
# WEBSITE SETTINGS
# ==================================================

@admin.register(WebsiteSettings)
class WebsiteSettingsAdmin(admin.ModelAdmin):

    list_display = (
        "business_name",
        "phone",
        "email",
        "updated_at",
    )

    readonly_fields = (
        "id",
        "created_at",
        "updated_at",
    )


# ==================================================
# LOCATIONS
# ==================================================

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "phone",
        "opening_time",
        "closing_time",
    )

    search_fields = (
        "name",
        "address",
    )

    readonly_fields = (
        "id",
        "created_at",
    )


# ==================================================
# USERS
# ==================================================

@admin.register(User)
class UserAdmin(admin.ModelAdmin):

    list_display = (
        "email",
        "name",
        "role",
        "is_active",
        "created_at",
    )

    list_filter = (
        "role",
        "is_active",
    )

    search_fields = (
        "email",
        "name",
    )

    readonly_fields = (
        "id",
        "created_at",
        "updated_at",
    )