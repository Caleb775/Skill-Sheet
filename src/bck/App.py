from flask import Flask, jsonify, request
import mysql.connector

app = Flask(__name__)

# MySQL database connection
db = mysql.connector.connect(
    host="localhost",
    user="your_username",
    password="your_password",
    database="my_website_db"
)

cursor = db.cursor()

# Create a simple API endpoint to fetch data from MySQL
@app.route('/api/users', methods=['GET'])
def get_users():
    cursor.execute("SELECT * FROM users")
    result = cursor.fetchall()
    users = [{'id': user[0], 'name': user[1], 'email': user[2]} for user in result]
    return jsonify(users)

if __name__ == '__main__':
    app.run(debug=True)
