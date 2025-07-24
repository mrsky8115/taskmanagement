from django.urls import path,include
from rest_framework.routers import DefaultRouter
from to_do_app.views import TodolistApis

router=DefaultRouter()
router.register("todolist",TodolistApis)

urlpatterns = [
    path('', include(router.urls)),
]