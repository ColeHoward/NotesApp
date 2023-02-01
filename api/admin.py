from django.contrib import admin

# Register your models here.  ; must do this if you want to use models inside of admin portal
from .models import Note

admin.site.register(Note)
