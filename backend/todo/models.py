from django.db import models
from django.utils import timezone
from django.contrib.auth.models import Group

# Create your models here.


class Todo(models.Model):

    title = models.CharField(max_length=200, blank=False, null=False)
    desc = models.TextField(max_length=2000, blank=True, null=True)

    completed = models.BooleanField(default=False)
    last_modified_on = models.DateTimeField(default=timezone.now)

    archived = models.BooleanField(default=False)

    group = models.ForeignKey(
        Group, on_delete=models.CASCADE, related_name="todos", blank=True, null=True
    )
