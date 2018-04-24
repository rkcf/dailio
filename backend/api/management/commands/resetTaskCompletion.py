from django.core.management.base import BaseCommand
from api.models import Task


class Command(BaseCommand):
    help = 'Set all task completion to false and set streak to 0 if incomplete'

    def handle(self, *args, **options):
        for task in Task.objects.all():
            if not task.task_completed:
                task.task_streak = 0
            task.task_completed = False
            task.save()
