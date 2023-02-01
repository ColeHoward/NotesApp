from django.db import models

# Create your models here.

# this is where we define how our database looks; every class represents a table in the database
class Note(models.Model):
    # attributes defined outside init belong to the class rather than the object
    body = models.TextField(null=True, blank=True)  # null mean it can be saved to the databse without values; blank means we can submit a form w/out values
    updated = models.DateTimeField(auto_now=True)  # auto_now means that every time the save method is invoked, we take a timestamp
    created = models.DateTimeField(auto_now_add=True)  # this only takes a timestamp on the creation of the Note

    def __str__(self) -> str:
        return self.body[:50]

