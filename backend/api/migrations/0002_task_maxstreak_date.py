# Generated by Django 2.0.3 on 2018-04-24 20:26

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial_squashed_0005_auto_20180413_2040'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='maxstreak_date',
            field=models.DateField(default=datetime.date.today),
        ),
    ]
