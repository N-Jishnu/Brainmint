from django.urls import path
from .views import create_project, get_projects

urlpatterns = [
    path('projects/create/', create_project),
    path('projects/', get_projects),
]

