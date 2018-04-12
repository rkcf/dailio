from rest_framework import serializers
from api.models import Task

class TaskSerializer(serializers.ModelSerializer):
    """Class for daily task serialization into json for api"""
    class Meta:
        model = Task
        fields = ('task_id', 'task_name', 'task_completed', 'task_streak', 'task_maxstreak')
        read_only_fields = ('task_id', 'task_streak', 'task_completed', 'task_maxstreak')

class CompletionSerializer(serializers.ModelSerializer):
    """Class to expose only task id and completion state"""
    class Meta:
        model = Task
        fields = ('task_id', 'task_completed')
        read_only_fields = ('task_id', 'task_completed')

