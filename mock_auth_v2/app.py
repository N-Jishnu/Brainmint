from flask import Flask, request, jsonify
import json, os
app = Flask(__name__)
DATA_FILE = 'users.json'
def read_users():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def write_users(users):
    with open(DATA_FILE, 'w') as f:
        json.dump(users, f, indent=4)

@app.route('/signup', methods=['POST'])
def signup():
    users = read_users()
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required!"}), 400

    if any(u['username'] == username for u in users):
        return jsonify({"error": "User already exists!"}), 400

    users.append({"username": username, "password": password})
    write_users(users)
    return jsonify({"message": "Signup successful!"})
    

@app.route('/login', methods=['POST'])
def login():
    users = read_users()
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required!"}), 400

    for u in users:
        if u['username'] == username and u['password'] == password:
            return jsonify({"message": "Login successful!"})

    return jsonify({"error": "Invalid credentials!"}), 401

@app.route('/users', methods=['GET'])
def get_users():
    users = read_users()
    return jsonify(users)

if __name__ == '__main__':
    app.run(debug=True)
