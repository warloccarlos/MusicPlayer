from flask import Flask, Blueprint
from .player import player
import os

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.urandom(24)

    from . import player
    app.register_blueprint(player, url_prefix='/')
    
    return app