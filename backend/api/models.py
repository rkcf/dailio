from django.db import models

class Task(models.Model):
    """Class for daily task"""
    task_id = models.AutoField(primary_key=True)
    task_name = models.CharField(max_length=50)
    task_completed = models.BooleanField(default="False")
    task_streak = models.IntegerField(default=0)
    task_maxstreak = models.IntegerField(default=0)

    def increment_streak(self):
        self.task_streak += 1
        if self.task_maxstreak < self.task_streak:
            self.task_maxstreak = self.task_streak
        self.save()

    def decrement_streak(self):
        self.task_streak -= 1
        if self.task_maxstreak > self.task_streak:
            self.task_maxstreak = self.task_streak
        self.save()
