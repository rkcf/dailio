"""
dailio api views
"""

from api.models import Task
from api.serializers import TaskSerializer
from rest_framework import generics

class TaskAll(generics.ListCreateAPIView):
    """view to retrieve all or create a daily task"""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TaskSingle(generics.RetrieveUpdateDestroyAPIView):
    """view to get, delete, or update a single daily task"""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
