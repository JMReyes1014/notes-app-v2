from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import userSerializer, noteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = noteSerializer
    permission_classes = [IsAuthenticated] # This line makes sure the user is authenticated

    def get_queryset(self): # This function gets all the notes of the user
        user = self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid(): # This line checks if the serializer is valid (Title and content are not empty)
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
            
class NoteDelete(generics.DestroyAPIView): # This class inherits from the DestroyAPIView class to delete a note
    serializer_class = noteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self): # This function gets all the notes of the user
        user = self.request.user
        return Note.objects.filter(author=user)
    
# This class inherits from the CreateAPIView 
# class to create a new user
class CreateUserView(generics.CreateAPIView):    
    queryset = User.objects.all() # This line gets all the users
    serializer_class = userSerializer
    permission_classes = [AllowAny] # This line allows anyone to create a user
    
class userDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({'username': user.username})

