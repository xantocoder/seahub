# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2019-03-01 02:16


from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('file_tags', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='filetags',
            name='parent_folder_uuid',
        ),
    ]
