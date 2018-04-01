from rest_framework import serializers
from api.models import Task

class TaskSerializer(serializers.ModelSerializer):
    """Class for daily task serialization into json for api"""
    class Meta:
        model = Task
        fields = ('task_id', 'task_name')
