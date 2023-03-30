from django.db import models
import hashlib

# Create your models here.

class Groups(models.Model):
    description = models.CharField(max_length=70)

    def __str__(self):
        return self.description

class Publication_status(models.Model):
    description = models.CharField(max_length=70)

    def __str__(self):
        return self.description

class Publication_topics(models.Model):
    description = models.CharField(max_length=70)
    enabled = models.BooleanField(default=True)

    def __str__(self):
        return self.description


class Users(models.Model):
    username = models.CharField(max_length=70,default="")
    first_name = models.CharField(max_length=70)
    last_name = models.CharField(max_length=70)
    group = models.ForeignKey(Groups, on_delete=models.CASCADE)

    def __str__(self):
        return self.first_name + " " + self.last_name


class Publications(models.Model):
    title = models.CharField(max_length=70)
    content = models.CharField(max_length=20000)
    created_on = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(Users, on_delete=models.CASCADE)
    status = models.ForeignKey(Publication_status, on_delete=models.CASCADE)
    topic = models.ForeignKey(Publication_topics, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Comments(models.Model):
    comment = models.CharField(max_length=300)
    author = models.ForeignKey(Users, on_delete=models.CASCADE)
    publication = models.ForeignKey(Publications, on_delete=models.CASCADE)
    def __str__(self):
        return self.comment

class Favorites(models.Model):
    author = models.ForeignKey(Users, on_delete=models.CASCADE)
    publication = models.ForeignKey(Publications, on_delete=models.CASCADE)

