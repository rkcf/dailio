from django.core.management.base import BaseCommand
from api.models import Task

class Command(BaseCommand):
    help = 'Set all tasks task_completion status to false and reset streak to 0 if not completed'

    def handle(self, *args, **options):
        for task in Task.objects.all():
            if task.task_completed == False:
                task.task_streak = 0
            task.task_completed = False
            task.save()

