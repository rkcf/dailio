"""
dailio api views
"""
from api.models import Task
from api.serializers import TaskSerializer, CompletionSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

class TaskAll(generics.ListCreateAPIView):
    """view to retrieve all or create a daily task"""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TaskSingle(generics.RetrieveUpdateDestroyAPIView):
    """view to get, or delete a single daily task"""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TaskCompletion(generics.GenericAPIView):
    """view for setting the task completion through the /tasks/id/done/ endpoint"""
    queryset = Task.objects.all()
    serializer_class = CompletionSerializer

    def put(self, request, *args, **kwargs):
        """Set task_completed to true"""
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid()
        serializer.save(task_completed=True)
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        """Set task_completed to false"""
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid()
        serializer.save(task_completed=False)
        return Response(serializer.data)
