from flask import Flask, request, Response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy.sql import func
import datetime
from flask import jsonify, render_template, render_template_string
from dataclasses import dataclass
import jsonpickle
import json
from types import SimpleNamespace


api = Flask(__name__)
db = SQLAlchemy()
migrate = Migrate(api, db)

api.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:@127.0.0.1:3306/notes"

db.init_app(api)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(50))

class Subject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(255))

@dataclass
class Note(db.Model):
    id: int
    name: str
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    note = db.Column(db.Text, nullable=False)
    subject_id = db.Column(db.Integer, db.ForeignKey("subject.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    dateAdded = db.Column(db.DateTime(timezone=True), server_default=func.now())
    dateModified = db.Column(db.DateTime(timezone=True), onupdate=func.now())


@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Pedro",
        "about" :"Hello im trying react with flask and axios"
    }

    return response_body

@api.route("/notes")
def notes_list():
    notes = Note.query.all()
    notes1 = db.session.execute(db.select(Note)).scalars()
    return jsonpickle.encode(notes)

    
@api.route("/notes/add", methods=['GET', 'POST'])
def post_note():
    if request.method == 'POST':  
        data = request.data
        # json solution because it returned some non iterable dict, tried get_json, get_data, jsonfy and send it from json javascript
        dataNote = json.loads(data, object_hook=lambda d: SimpleNamespace(**d))
        note=(Note(name=dataNote.name, note=dataNote.note, subject_id=dataNote.subject_id, user_id=dataNote.user_id))
        db.session.add(note)
        db.session.commit()
        print ('-------------logging', note)
        return jsonpickle.encode(note)
    else:
        return 'nope'

    
    # {"message": "succes", "notes": jsonpickle.encode(note)}
   
# session.execute(
# ...     select(User.name, Address).where(User.id == Address.user_id).order_by(Address.id)
# ... ).all()

# @api.route("/users")
# def users_list():
#     users = User.query.all()
#     return jsonify(users)

# with api.app_context():
#     notes = Note.query.all()
#     print (json.dumps(notes))