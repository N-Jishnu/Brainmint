from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import json

@csrf_exempt
def create_sprint(request):
    data = json.loads(request.body)
    with connection.cursor() as cursor:
        cursor.execute("""
            INSERT INTO sprints
            (project_id, name, start_date, end_date, status)
            VALUES (%s,%s,%s,%s,'Active')
        """, [
            data['project_id'],
            data['name'],
            data['start_date'],
            data['end_date']
        ])
    return JsonResponse({"message": "Sprint Created"})

def get_sprints(request, project_id):
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT id, name FROM sprints WHERE project_id=%s",
            [project_id]
        )
        rows = cursor.fetchall()

    return JsonResponse(
        [{"id": r[0], "name": r[1]} for r in rows],
        safe=False
    )

