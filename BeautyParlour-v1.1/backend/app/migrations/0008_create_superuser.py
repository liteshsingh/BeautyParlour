from django.db import migrations
from django.contrib.auth.hashers import make_password

def create_superuser(apps, schema_editor):
    User = apps.get_model('app', 'User')
    if not User.objects.filter(email='superuser@beautyparlour.com').exists():
        User.objects.create(
            name='Super Admin',
            email='superuser@beautyparlour.com',
            password=make_password('superadmin123'),
            role='admin',
            is_staff=True,
            is_superuser=True
        )

class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_rename_name_service_makeup_type_and_more'),
    ]

    operations = [
        migrations.RunPython(create_superuser),
    ]
