from flask import Flask

api = Flask(__name__)

@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Timbo",
        "about" :"Hello im trying react with flask and axios"
    }

    return response_body
