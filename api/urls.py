# create all the URL routing for the app; every single page/endpoint the user goes to
from django.urls import path
from . import views
from .models import Note



urlpatterns = [
    
    path('', views.getRoutes, name='routes'),
    path('notes/', views.getNotes, name='notes'),
    path('notes/<str:note_id>/', views.getNote, name='note'),
]