from django.template import loader
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_permission_codename, login, authenticate
from django.shortcuts import get_object_or_404, redirect, render
from .serializers import UserSerializer, UserSerializerWithToken
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.response import Response

from rest_framework import permissions, status


class HasRequiredPermissionForMethod(permissions.BasePermission):
    get_permission_required = None
    put_permission_required = None
    post_permission_required = None

    def has_permission(self, request, view):
        permission_required_name = f"{request.method.lower()}_permission_required"
        if not request.user.is_authenticated:
            return False
        if not hasattr(view, permission_required_name):
            view_name = view.__class__.__name__
            self.message = f"IMPLEMENTATION ERROR: Please add the {permission_required_name} variable in the API view class: {view_name}."
            return False

        permission_required = getattr(view, permission_required_name)
        if not request.user.has_perm(permission_required):
            self.message = f"Access denied. You need the {permission_required} permission to access this service with {request.method}."
            return False

        return True


class UserViewSet(viewsets.ViewSet):
    def get_permissions(self):
        # Your logic should be all here
        if self.request.method == "POST":
            self.permission_classes = [
                permissions.AllowAny,
            ]
        else:
            self.permission_classes = [
                permissions.IsAuthenticated,
            ]

        return super(UserViewSet, self).get_permissions()

    def get_object(self):
        pk = self.kwargs.get("pk")

        if pk == "current":
            return self.request.user

        return super(UserViewSet, self).get_object()

    def list(self, request):

        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def get(self, request):

        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
