import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'mysql+mysqlconnector://username:password@localhost/marketing')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    status = db.Column(db.String(50), default='pending')
    assigned_to = db.Column(db.String(100), nullable=True)
from flask import request, jsonify
from flask_restful import Resource, Api
from models import db, Task

api = Api()

class TaskListResource(Resource):
    def get(self):
        tasks = Task.query.all()
        return jsonify([task.to_dict() for task in tasks])

    def post(self):
        data = request.get_json()
        new_task = Task(
            title=data['title'],
            description=data.get('description'),
            assigned_to=data.get('assigned_to')
        )
        db.session.add(new_task)
        db.session.commit()
        return jsonify(new_task.to_dict()), 201

class TaskResource(Resource):
    def get(self, task_id):
        task = Task.query.get_or_404(task_id)
        return jsonify(task.to_dict())

    def put(self, task_id):
        task = Task.query.get_or_404(task_id)
        data = request.get_json()
        task.title = data.get('title', task.title)
        task.description = data.get('description', task.description)
        task.status = data.get('status', task.status)
        task.assigned_to = data.get('assigned_to', task.assigned_to)
        db.session.commit()
        return jsonify(task.to_dict())

    def delete(self, task_id):
        task = Task.query.get_or_404(task_id)
        db.session.delete(task)
        db.session.commit()
        return '', 204

api.add_resource(TaskListResource, '/tasks')
api.add_resource(TaskResource, '/tasks/<int:task_id>')

from flask import Flask
from config import Config
from models import db
from routes import api

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
api.init_app(app)

if __name__ == '__main__':
    app.run(debug=True)
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    status = db.Column(db.String(50), default='pending')
    assigned_to = db.Column(db.String(100), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'assigned_to': self.assigned_to
        }

