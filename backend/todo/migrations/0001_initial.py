# Generated by Django 3.2.5 on 2021-10-21 03:08

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Todo",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=200)),
                ("desc", models.TextField(blank=True, max_length=2000, null=True)),
                ("status", models.CharField(default="Not Started", max_length=100)),
                (
                    "last_modified_on",
                    models.DateTimeField(default=django.utils.timezone.now),
                ),
                ("archived", models.BooleanField(default=False)),
            ],
        ),
    ]