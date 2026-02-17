import pymysql

def get_db():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="12345",
        database="brainmint",
        cursorclass=pymysql.cursors.DictCursor
    )
