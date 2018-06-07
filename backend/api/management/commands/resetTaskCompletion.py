from django.core.management.base import BaseCommand
from api.models import Task
from accounts.models import UserProfile
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = 'Set all task completion to false and set streak to 0 if incomplete'

    def handle(self, *args, **options):
        for user in User.objects.all():
            # Check if vacation mode is true
            if UserProfile.objects.get(user=user).vacation:
                # If true, unset task completion and leave streak alone
                for task in Task.objects.all():
                    task.task_completed = False
                    task.save()
            else:
                # Otherwise reset completion and streak
                for task in Task.objects.all():
                    if not task.task_completed:
                        task.task_streak = 0
                    task.task_completed = False
                    task.save()
