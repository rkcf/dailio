# Generated by Django 2.0.3 on 2018-05-10 21:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_task_maxstreak_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='order',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
