from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer
import datetime

def getNotesList():
    notes = Note.objects.all().order_by('-updated')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


def getSpecificDetail(note_id):
    notes = Note.objects.get(id=note_id)
    serializer = NoteSerializer(notes, many=False)
    return Response(serializer.data)


def createNote(request):
    data = request.data
    note = Note.objects.create(body=data['body'])
    note.updated = datetime.datetime.now()
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)


def updateNote(request, note_id):
    data = request.data
    note = Note.objects.get(id=note_id)
    serializer = NoteSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


def deleteNote(note_id):
    note = Note.objects.get(id=note_id)
    note.delete()
    return Response('Note was deleted!')