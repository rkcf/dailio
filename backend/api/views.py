"""
dailio api views
"""
from api.models import Task
from api.serializers import TaskSerializer, CompletionSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


class TaskAll(generics.ListCreateAPIView):
    """View to retrieve all or create a daily task"""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)


class TaskSingle(generics.RetrieveUpdateDestroyAPIView):
    """View to get, edit, or delete a single daily task"""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)


class TaskCompletion(generics.GenericAPIView):
    """View for setting the task completion"""
    queryset = Task.objects.all()
    serializer_class = CompletionSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def put(self, request, *args, **kwargs):
        """Set task_completed to true"""
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid()
        serializer.save(task_completed=True)
        instance.increment_streak()
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        """Set task_completed to false"""
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid()
        serializer.save(task_completed=False)
        instance.decrement_streak()
        return Response(serializer.data)
