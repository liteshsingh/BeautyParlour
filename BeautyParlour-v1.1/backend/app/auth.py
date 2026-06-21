import jwt
import os
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from app.models.models import User


class JWTAuthentication(BaseAuthentication):
    """
    Custom JWT authentication class
    """
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        
        if not auth_header:
            return None
        
        try:
            prefix, token = auth_header.split(' ')
            if prefix.lower() != 'bearer':
                raise AuthenticationFailed('Invalid token prefix')
            
            # Decode token
            payload = jwt.decode(
                token,
                os.getenv('JWT_SECRET_KEY', 'jwt-secret'),
                algorithms=[os.getenv('JWT_ALGORITHM', 'HS256')]
            )
            
            # Get user from token
            user = User.objects.get(id=payload['id'])
            
            if not user.is_active:
                raise AuthenticationFailed('User is inactive')
            
            return (user, token)
        
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid token')
        except User.DoesNotExist:
            raise AuthenticationFailed('User not found')
        except ValueError:
            raise AuthenticationFailed('Invalid authorization header')
