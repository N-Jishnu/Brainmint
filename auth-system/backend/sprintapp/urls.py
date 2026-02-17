from django.urls import path
from .views import create_sprint, get_sprints

urlpatterns = [
    path('sprints/create/', create_sprint),
    path('sprints/<int:project_id>/', get_sprints),
]

