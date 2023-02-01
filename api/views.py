from django.shortcuts import render
# from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import ensure_csrf_cookie 
from .serializers import NoteSerializer
from .models import Note
from .utils import updateNote, deleteNote, getSpecificDetail, getNotesList, createNote


# specify all the routes inside the application
@api_view(['GET'])
def getRoutes(request):
    # /notes GET
    # /notes POST
    # /notes/id PUT
    # /notes/id DELETE
    # /notes/id GET

    routes = [
        {
            'Endpoint': '/notes/',  # gives us a JSON response of all the notes inside the database
            'method': 'GET',  
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/',
            'method': 'POST',
            'body': None,
            'description': 'Adds a single note object'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes a single note object'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'PUT',
            'body': None,
            'description': 'Updates a single note object'
        }
    ]
    
    return Response(routes) 



@api_view(['GET', 'POST'])
def getNotes(request):

    if request.method == 'GET':
        return getNotesList()

    elif request.method == "POST":
        return createNote(request)


@api_view(['GET', 'PUT', 'DELETE'])
def getNote(request, note_id):
    
    if request.method == 'GET':
        return getSpecificDetail(note_id)
    
    elif request.method == "PUT":
        return updateNote(request, note_id)
        
    elif request.method == "DELETE":
        return deleteNote(note_id)
