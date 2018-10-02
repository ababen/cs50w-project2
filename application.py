import os

from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat")
def chat():
    return render_template("chat.html")

@socketio.on("send message")
def send(data):
    # messages1 = {}
    # messages1.update(data)
    # nickname = data["nickname"]
    # message = data["message"]
    # timestamp = data["timestamp"]
    emit("announce chat", data, broadcast=True)