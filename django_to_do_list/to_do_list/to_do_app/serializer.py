from rest_framework import serializers
from to_do_app.models import TodoListModel

class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model=TodoListModel
        fields=['url','id','title','description','is_completed']


