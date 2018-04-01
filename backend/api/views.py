from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from api.models import Task
from api.serializers import TaskSerializer

@csrf_exempt
def task_list(request):
    """view to retrieve all or create a daily task"""
    #retrieve list of all tasks
    if request.method == 'GET':
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return JsonResponse(serializer.data, safe=False)

    #create a new task
    elif request.method =='POST':
        parsed_data = JSONParser().parse(request)
        serializer = TaskSerializer(data=parsed_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def task_single(request, pk):
    """view to get, delete, or update a single daily task"""
    #make sure task exists
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return HttpResponse(status=404)

    #return individual task
    if request.method == 'GET':
        serializer = TaskSerializer(task)
        return JsonResponse(serializer.data, status=200)

    #delete individual task
    if request.method == 'DEL':
        task.delete()
        return HttpResponse(status=204) 
