from typing import List
from django.contrib.auth.models import User
from django.shortcuts import render
from .models import Todo


# Create your views here.
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin

from django.urls import reverse_lazy


from rest_framework import viewsets
from .serializers import TodoSerializer
from django.db import transaction


# Create your views here.


class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
