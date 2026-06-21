from django.db import models
import uuid


# ==================================================
# WEBSITE SETTINGS
# ==================================================

class WebsiteSettings(models.Model):

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    business_name = models.CharField(
        max_length=255,
        default="Glamup by POOJA Makeup Artist & Hairstylist"
    )

    logo = models.ImageField(
        upload_to="logo/",
        blank=True,
        null=True
    )

    phone = models.CharField(
        max_length=20,
        blank=True
    )

    email = models.EmailField(
        blank=True
    )

    address = models.TextField(
        blank=True
    )

    instagram = models.URLField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        db_table = "website_settings"

    def __str__(self):
        return self.business_name


# ==================================================
# BEAUTY SERVICES
# ==================================================

class Service(models.Model):

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    makeup_type = models.CharField(
        max_length=150
    )

    service_group = models.CharField(
        max_length=100,
        default="General"
    )

    description = models.TextField(
        blank=True
    )

    image = models.ImageField(
        upload_to="services/",
        blank=True,
        null=True
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    offer_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True
    )

    duration_minutes = models.IntegerField(
        default=60
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        db_table = "beauty_services"

    def __str__(self):
        return self.makeup_type


# ==================================================
# BUSINESS LOCATION
# ==================================================

class Location(models.Model):

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    name = models.CharField(
        max_length=100
    )

    address = models.TextField()

    phone = models.CharField(
        max_length=20
    )

    opening_time = models.TimeField(
        default="10:00"
    )

    closing_time = models.TimeField(
        default="19:00"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        db_table = "locations"

    def __str__(self):
        return self.name


# ==================================================
# APPOINTMENTS
# ==================================================

class Appointment(models.Model):

    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Confirmed", "Confirmed"),
        ("Completed", "Completed"),
        ("Cancelled", "Cancelled"),
    ]

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    # Customer Details
    name = models.CharField(
        max_length=100
    )

    email = models.EmailField()

    phone = models.CharField(
        max_length=20
    )

    # Service Details
    service = models.CharField(max_length=100)

    makeupType = models.CharField(
        max_length=100
    )

    # Appointment Details
    date = models.DateField()

    time = models.TimeField()

    # Customer Location
    location = models.CharField(
        max_length=255,
        blank=True,
        default=""
    )

    customer_address = models.TextField(
        blank=True,
        null=True
    )

    latitude = models.DecimalField(
        max_digits=20,
        decimal_places=15,
        blank=True,
        null=True
    )

    longitude = models.DecimalField(
        max_digits=20,
        decimal_places=15,
        blank=True,
        null=True
    )

    notes = models.TextField(
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        db_table = "appointments"
        ordering = [
            "-date",
            "-time"
        ]

    def __str__(self):
        return f"{self.name} - {self.date}"


# ==================================================
# USERS
# ==================================================

class User(models.Model):

    ROLE_CHOICES = [
        ("admin", "Administrator"),
        ("agent", "Agent"),
        ("staff", "Staff"),
    ]

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    name = models.CharField(
        max_length=100
    )

    email = models.EmailField(
        unique=True
    )

    password = models.CharField(
        max_length=255
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="agent"
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        db_table = "users"

    def __str__(self):
        return self.email

    @property
    def is_authenticated(self):
        return True