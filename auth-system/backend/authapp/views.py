from django.http import JsonResponse 
from django.views.decorators.csrf import csrf_exempt 
from django.db import connection 
import json 
 
@csrf_exempt 
def signup(request): 
    data = json.loads(request.body) 
    email = data['email'] 
    password = data['password'] 
 
    with connection.cursor() as cursor: 
        cursor.execute( 
            "INSERT INTO users (email, password) VALUES (%s, %s)", 
            [email, password] 
        ) 
 
    return JsonResponse({"message": "Signup successful"}) 
 
 
@csrf_exempt 
def login(request): 
    data = json.loads(request.body) 
    email = data['email'] 
    password = data['password'] 
 
    with connection.cursor() as cursor: 
        cursor.execute( 
            "SELECT id FROM users WHERE email=%s AND password=%s", 
            [email, password] 
        ) 
        user = cursor.fetchone() 
 
    if user: 
        return JsonResponse({"message": "Login successful"}) 
    else: 
        return JsonResponse({"error": "Invalid credentials"}, status=401) 