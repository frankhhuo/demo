# Generated by Django 3.2.5 on 2021-10-25 02:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0003_rename_status_todo_completed'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='last_modified_on',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
