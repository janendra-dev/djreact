# Generated by Django 3.0.8 on 2020-08-11 18:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0005_customer_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='profile',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]