from flask import Flask, request, jsonify
import sqlite3
import os

app = Flask(__name__)
DB_NAME = 'users.db'

# ---------- DATABASE SETUP ----------
def init_db():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# ---------- SIGNUP ROUTE ----------
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password required!"}), 400

    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()

    # Check if user exists
    c.execute("SELECT * FROM users WHERE username=?", (username,))
    if c.fetchone():
        conn.close()
        return jsonify({"error": "User already exists!"}), 400

    # Insert new user
    c.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
    conn.commit()
    conn.close()

    return jsonify({"message": "Signup successful!"}), 201

# ---------- LOGIN ROUTE ----------
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()

    c.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
    user = c.fetchone()
    conn.close()

    if user:
        return jsonify({"message": "Login successful!"})
    else:
        return jsonify({"error": "Invalid credentials!"}), 401

# ---------- MAIN ----------
if __name__ == '__main__':
    init_db()
    app.run(debug=True)
