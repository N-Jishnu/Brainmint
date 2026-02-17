from flask import Flask, request, jsonify

app = Flask(__name__)

users = []

# Signup
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # Check for missing fields
    if not username or not password:
        return jsonify({"error": "Username and password required!"}), 400

    # Check for duplicate username
    for user in users:
        if user["username"] == username:
            return jsonify({"error": "Username already exists!"}), 400

    # Add user to list
    users.append({"username": username, "password": password})
    print ("users:")
    for i in users:
        print(i)
    return jsonify({"message": f"User {username} signed up successfully!"}), 201



# Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    for user in users:
        if user["username"] == username and user["password"] == password:
            return jsonify({"message": f"Welcome back, {username}!"}), 200

    return jsonify({"error": "Invalid username or password!"}), 401


if __name__ == '__main__':
    app.run(debug=True)
