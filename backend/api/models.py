
from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    place = models.CharField(max_length=100)
    image = models.ImageField(upload_to='person_images/', blank=True, null=True)

    def __str__(self):
        return self.name

class ChatMessage(models.Model):
    user_prompt = models.TextField()
    ai_response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Prompt: {self.user_prompt[:20]}..."        
