from django.shortcuts import render
from rest_framework import  viewsets
from rest_framework import serializers
from to_do_app.models import  TodoListModel
from to_do_app.serializer import ToDoSerializer

# Create your views here.
class TodolistApis(viewsets.ModelViewSet):
    queryset=TodoListModel.objects.all()
    serializer_class=ToDoSerializer
