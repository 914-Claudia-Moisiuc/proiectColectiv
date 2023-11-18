# Generated by Django 4.2.3 on 2023-11-10 14:52

from django.db import migrations, models
import recipe.models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='difficulty',
            field=models.IntegerField(validators=[recipe.models.validate_difficulty]),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='time_max',
            field=models.FloatField(validators=[recipe.models.validate_time]),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='time_min',
            field=models.FloatField(validators=[recipe.models.validate_time]),
        ),
    ]