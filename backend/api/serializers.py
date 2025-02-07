from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

# This is a class that inherits from the ModelSerializer class
#           used to serialize the User model
class userSerializer(serializers.ModelSerializer): 
    # This is a class that inherits from the Meta class
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only' : True}} 
        # This line makes the password field write only so no one can read it
        
    # This function is used to create a new user
    def create(self, validated_data):
        # This line creates a new user with the validated data
        user = User.objects.create_user(**validated_data)
        return user
    
class noteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'date', 'author']
        extra_kwargs = {"author": {"read_only": True}}