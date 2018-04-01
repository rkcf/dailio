from django.db import models

class Task(models.Model):
    """Class for daily task"""
    task_id = models.AutoField(primary_key=True)
    task_name = models.CharField(max_length=50)
