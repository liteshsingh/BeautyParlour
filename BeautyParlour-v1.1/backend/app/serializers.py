from rest_framework import serializers

from app.models.models import (
    Appointment,
    Location,
    User,
    Service,
    WebsiteSettings,
)


# ==========================
# APPOINTMENTS
# ==========================

class AppointmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Appointment

        fields = [
            "id",

            # Customer
            "name",
            "email",
            "phone",

            # Service
            "service",
            "makeupType",

            # Appointment
            "date",
            "time",

            # Location
            "location",
            "customer_address",
            "latitude",
            "longitude",

            # Notes / Status
            "notes",
            "status",

            # Audit
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]

    latitude = serializers.DecimalField(
        max_digits=20,
        decimal_places=15,
        required=False,
        allow_null=True
    )

    longitude = serializers.DecimalField(
        max_digits=20,
        decimal_places=15,
        required=False,
        allow_null=True
    )


# ==========================
# SERVICES
# ==========================

class ServiceSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Service

        fields = [
            "id",
            "makeup_type",
            "service_group",
            "description",
            "image",
            "image_url",
            "price",
            "offer_price",
            "duration_minutes",
            "is_active",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]

    def get_image_url(self, obj):
        request = self.context.get("request")

        if obj.image:
            if request:
                return request.build_absolute_uri(
                    obj.image.url
                )
            return obj.image.url

        return None


# ==========================
# WEBSITE SETTINGS
# ==========================

class WebsiteSettingsSerializer(
    serializers.ModelSerializer
):

    logo_url = serializers.SerializerMethodField()

    class Meta:
        model = WebsiteSettings

        fields = [
            "id",
            "business_name",
            "logo",
            "logo_url",
            "phone",
            "email",
            "address",
            "instagram",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]

    def get_logo_url(self, obj):
        request = self.context.get("request")

        if obj.logo:
            if request:
                return request.build_absolute_uri(
                    obj.logo.url
                )
            return obj.logo.url

        return None


# ==========================
# LOCATIONS
# ==========================

class LocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location

        fields = [
            "id",
            "name",
            "address",
            "phone",
            "opening_time",
            "closing_time",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
        ]


# ==========================
# USERS
# ==========================

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        required=False
    )

    class Meta:
        model = User

        fields = [
            "id",
            "name",
            "email",
            "password",
            "role",
            "is_active",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]


# ==========================
# LOGIN
# ==========================

class UserLoginSerializer(
    serializers.Serializer
):
    email = serializers.EmailField()

    password = serializers.CharField(
        write_only=True
    )