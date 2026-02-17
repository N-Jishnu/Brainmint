from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import json
@csrf_exempt
def create_project(request):
    data = json.loads(request.body)
    with connection.cursor() as cursor:
        cursor.execute(
        "INSERT INTO projects (name, owner_id) VALUES (%s, %s)",
        [data['name'], data['owner_id']]
    )
    return JsonResponse({"message": "Project Created"})
def get_projects(request):
    owner_id = request.GET.get("owner_id")
    with connection.cursor() as cursor:
        cursor.execute(
        "SELECT id, name FROM projects WHERE owner_id=%s",
        [owner_id]
        )
        rows = cursor.fetchall()
    return JsonResponse(
        [{"id": r[0], "name": r[1]} for r in rows],
        safe=False
    )
