"""
WSGI config for Beauty Parlour project.
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.config')

application = get_wsgi_application()
