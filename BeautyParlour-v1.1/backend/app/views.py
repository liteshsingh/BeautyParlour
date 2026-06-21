from datetime import datetime, timedelta
import os
import jwt

from django.contrib.auth.hashers import (
    make_password,
    check_password,
)

from rest_framework import (
    status,
    viewsets,
)

from rest_framework.decorators import (
    api_view,
    permission_classes,
)

from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from app.models.models import (
    Appointment,
    Service,
    Location,
    User,
    WebsiteSettings,
)

from app.serializers import (
    AppointmentSerializer,
    ServiceSerializer,
    WebsiteSettingsSerializer,
    LocationSerializer,
    UserSerializer,
    UserLoginSerializer,
)

# ==================================================
# APPOINTMENTS
# ==================================================

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        appointment = serializer.save(
            status="Confirmed"
        )

        return Response(
            {
                "appointmentId": str(
                    appointment.id
                ),
                "message":
                    "Appointment created successfully",
                **serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )

    def list(self, request, *args, **kwargs):

        queryset = self.get_queryset()

        appointment_status = request.query_params.get(
            "status"
        )

        if appointment_status:
            queryset = queryset.filter(
                status=appointment_status
            )

        serializer = self.get_serializer(
            queryset,
            many=True
        )

        return Response(
            serializer.data
        )

    def retrieve(self, request, *args, **kwargs):

        appointment = self.get_object()

        serializer = self.get_serializer(
            appointment
        )

        return Response(
            serializer.data
        )

    def partial_update(
        self,
        request,
        *args,
        **kwargs
    ):

        appointment = self.get_object()

        serializer = self.get_serializer(
            appointment,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save()

        return Response(
            serializer.data
        )


# ==================================================
# SERVICES
# ==================================================

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]

class WebsiteSettingsViewSet(viewsets.ModelViewSet):
    queryset = WebsiteSettings.objects.all()
    serializer_class = WebsiteSettingsSerializer
    permission_classes = [AllowAny]

# ==================================================
# LOCATIONS
# ==================================================

class LocationViewSet(
    viewsets.ReadOnlyModelViewSet
):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [AllowAny]


# ==================================================
# LOGIN
# ==================================================

@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):

    serializer = UserLoginSerializer(
        data=request.data
    )

    serializer.is_valid(
        raise_exception=True
    )

    email = serializer.validated_data[
        "email"
    ]

    password = serializer.validated_data[
        "password"
    ]

    try:

        user = User.objects.get(
            email=email
        )

        if not check_password(
            password,
            user.password
        ):
            return Response(
                {
                    "message":
                    "Invalid email or password"
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        payload = {
            "id": str(user.id),
            "email": user.email,
            "role": user.role,
            "iat": datetime.utcnow(),
            "exp":
                datetime.utcnow()
                + timedelta(hours=24),
        }

        token = jwt.encode(
            payload,
            os.getenv(
                "JWT_SECRET_KEY",
                "jwt-secret"
            ),
            algorithm=os.getenv(
                "JWT_ALGORITHM",
                "HS256"
            ),
        )

        return Response(
            {
                "token": token,
                "user": {
                    "id": str(user.id),
                    "name": user.name,
                    "email": user.email,
                    "role": user.role,
                },
            },
            status=status.HTTP_200_OK,
        )

    except User.DoesNotExist:

        return Response(
            {
                "message":
                "Invalid email or password"
            },
            status=status.HTTP_401_UNAUTHORIZED,
        )


# ==================================================
# REGISTER
# ==================================================

@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):

    serializer = UserSerializer(
        data=request.data
    )

    serializer.is_valid(
        raise_exception=True
    )

    user = User.objects.create(
        name=serializer.validated_data[
            "name"
        ],

        email=serializer.validated_data[
            "email"
        ],

        password=make_password(
            serializer.validated_data[
                "password"
            ]
        ),

        role=request.data.get(
            "role",
            "agent"
        ),
    )

    return Response(
        {
            "message":
            "User registered successfully",

            "id": str(user.id),
        },
        status=status.HTTP_201_CREATED,
    )