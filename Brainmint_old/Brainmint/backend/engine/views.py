from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json, hashlib
from .db import get_db

@csrf_exempt
def signup(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=400)

    data = json.loads(request.body)
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    hashed = hashlib.sha256(password.encode()).hexdigest()

    db = get_db()
    cursor = db.cursor()

    try:
        cursor.execute(
            "INSERT INTO users (full_name, email, password) VALUES (%s, %s, %s)",
            (name, email, hashed)
        )
        db.commit()
        return JsonResponse({"message": "Signup successful"})
    except Exception as e:
        return JsonResponse({"error": "Email already exists"}, status=400)
    finally:
        db.close()



@csrf_exempt
def login(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=400)

    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")

    hashed = hashlib.sha256(password.encode()).hexdigest()

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "SELECT id, full_name FROM users WHERE email=%s AND password=%s",
        (email, hashed)
    )
    user = cursor.fetchone()
    db.close()

    if user:
        return JsonResponse({
            "message": "Login successful",
            "user": user
        })
    else:
        return JsonResponse({"error": "Invalid credentials"}, status=401)



def get_tasks(request):
    user_id = request.GET.get("user_id")
    if not user_id:
        return JsonResponse({"error": "user_id required"}, status=400)

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "SELECT * FROM tasks WHERE user_id = %s",
        (user_id,)
    )
    rows = cursor.fetchall()
    db.close()

    data = {
        "todo": [],
        "progress": [],
        "review": [],
        "done": []
    }

    for t in rows:
        task = {
            "id": str(t["id"]),
            "title": t["title"],
            "priority": t["priority"],
            "dueDate": t["due_date"],
            "avatar": "https://placehold.co/32x32",
            "subtasks": {
                "completed": t["subtasks_completed"],
                "total": t["subtasks_total"]
            },
            "progress": (
                int((t["subtasks_completed"] / t["subtasks_total"]) * 100)
                if t["subtasks_total"] > 0 else 0
            ),
            "isWIP": t["status"] == "progress"
        }

        data[t["status"]].append(task)

    return JsonResponse(data)



@csrf_exempt
def create_task(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=400)

    data = json.loads(request.body)

    db = get_db()
    cursor = db.cursor()

    cursor.execute("""
        INSERT INTO tasks 
        (user_id, title, priority, status, due_date, subtasks_total, subtasks_completed)
        VALUES (%s, %s, %s, %s, %s, %s, 0)
    """, (
        data["user_id"],
        data["title"],
        data["priority"],
        data["status"],
        data.get("due_date", ""),
        data.get("subtasks_total", 0)
    ))

    db.commit()
    db.close()

    return JsonResponse({"message": "Task created"})


@csrf_exempt
def update_task_status(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=400)

    data = json.loads(request.body)

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "UPDATE tasks SET status = %s WHERE id = %s",
        (data["status"], data["task_id"])
    )

    db.commit()
    db.close()

    return JsonResponse({"message": "Task status updated"})

# Add this to your views.py file

@csrf_exempt
def increment_subtask(request):
    """
    Increment the subtask completed count for a task
    """
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=400)

    data = json.loads(request.body)
    task_id = data.get("task_id")
    subtasks_completed = data.get("subtasks_completed")

    if not task_id or subtasks_completed is None:
        return JsonResponse({"error": "task_id and subtasks_completed required"}, status=400)

    db = get_db()
    cursor = db.cursor()

    try:
        cursor.execute(
            "UPDATE tasks SET subtasks_completed = %s WHERE id = %s",
            (subtasks_completed, task_id)
        )
        db.commit()
        return JsonResponse({"message": "Subtask incremented successfully"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    finally:
        db.close()


@csrf_exempt
def delete_task(request):
    """
    Delete a task
    """
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=400)

    data = json.loads(request.body)
    task_id = data.get("task_id")

    if not task_id:
        return JsonResponse({"error": "task_id required"}, status=400)

    db = get_db()
    cursor = db.cursor()

    try:
        cursor.execute("DELETE FROM tasks WHERE id = %s", (task_id,))
        db.commit()
        return JsonResponse({"message": "Task deleted successfully"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    finally:
        db.close()

# Also add this to your urls.py:
