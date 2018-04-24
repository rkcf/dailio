from django.db import models
from datetime import date

class CompletionDate(models.Model):
    """Store a task completion on a certain date"""
    completion_date = models.DateField(auto_now_add=True, primary_key=True)

class Task(models.Model):
    """Class for daily task"""
    task_id = models.AutoField(primary_key=True)
    task_name = models.CharField(max_length=50)
    task_completed = models.BooleanField(default="False")
    task_streak = models.IntegerField(default=0)
    task_maxstreak = models.IntegerField(default=0)
    completion_dates = models.ManyToManyField(CompletionDate) #relationship with CompletionDate objects this task was completed on
    maxstreak_date = models.DateField(default=date.today) #date maxstreak is completed on

    def increment_streak(self):
        """Increase the current task streak and set max streak if necessary"""
        self.task_streak += 1

        #Create a new completion date object, or return one for the current date.
        today = date.today()
        date_obj, created = CompletionDate.objects.get_or_create(completion_date=today)
        self.completion_dates.add(date_obj)

        #Update max streak if necessary
        if self.task_maxstreak < self.task_streak:
            self.task_maxstreak = self.task_streak
            self.maxstreak_date = date.today()

        self.save()

    def decrement_streak(self):
        """Decrease the current task streak and set max streak if necessary"""
        #Do nothing if streak already at 0
        if self.task_streak == 0:
            return

        self.task_streak -= 1

        #remove task from completion date relationship
        today = date.today()
        self.completion_dates.remove(CompletionDate.objects.get(completion_date = today))

        #Update maxstreak if it was set today
        if self.maxstreak_date == date.today():
            self.task_maxstreak = self.task_streak

        self.save()
