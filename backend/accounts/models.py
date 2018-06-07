from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    """ Extension of User model """
    user = models.OneToOneField(User,
                                on_delete=models.CASCADE,
                                primary_key=True)
    # if vacation mode is set to true, task streaks will not be reset
    vacation = models.BooleanField(default=False)
