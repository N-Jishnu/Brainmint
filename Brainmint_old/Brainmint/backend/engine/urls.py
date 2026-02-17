from django.urls import path
from .views import signup, login, get_tasks, create_task, update_task_status , increment_subtask , delete_task

urlpatterns = [
    path("signup/", signup),
    path("login/", login),

    path("tasks/", get_tasks),
    path("tasks/create/", create_task),
    path("tasks/update-status/", update_task_status),
    path("tasks/increment-subtask/", increment_subtask),
    path("tasks/delete/", delete_task),
]
