from flask import Blueprint, render_template, request, redirect, url_for
import os

player = Blueprint('player', __name__)

@player.route('/', methods=['GET', 'POST'])
def index():
    path = os.path.dirname(os.path.abspath(__file__))
    directory = 'static/audio'
    with os.scandir(os.path.join(path, directory)) as entries:
        audio_files = [entry.name for entry in entries if entry.is_file() and entry.name.endswith('.mp3')]
    return render_template('index.html', audio_files=audio_files, src=directory)