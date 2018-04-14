from django.core.management.base import BaseCommand
from api.models import Task

class Command(BaseCommand):
    help = 'Set all tasks task_completion status to false'

    def handle(self, *args, **options):
        for task in Task.objects.all():
            task.task_completed = False
            task.save()

