from flask import Flask
from flask_cors import CORS
from .routes import bp

def create_app():
    app = Flask(__name__)
    CORS(app)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
    app.register_blueprint(bp)
    return app
