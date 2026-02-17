from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
def get_tasks(request):
    data = [
    {"id": 1, "title": "Set up Django project", "status": "Done"},
    {"id": 2, "title": "Create API structure", "status": "Pending"}
    ]
    return JsonResponse(data, safe=False)