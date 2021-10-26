# Generated by Django 3.2.5 on 2021-10-25 20:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('todo', '0005_alter_todo_last_modified_on'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='group',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='todos', to='auth.group'),
        ),
    ]
