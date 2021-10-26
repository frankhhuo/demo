from rest_framework import serializers
from .models import Todo
from rest_framework.response import Response
from django.utils import timezone


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ("id", "title", "desc", "completed", "last_modified_on")

    def validate(self, attrs):
        print(attrs)
        if (
            self.instance
            and attrs.get("last_modified_on")
            and attrs.get("last_modified_on") != self.instance.last_modified_on
        ):
            return Response(
                "Validation Error: the item has been chagned outside this session!"
            )
        return super(TodoSerializer, self).validate(attrs)

    def update(self, instance, validated_data):
        print(instance, validated_data)
        validated_data["last_modified_on"] = timezone.now()
        item = super(TodoSerializer, self).update(instance, validated_data)

        return item
