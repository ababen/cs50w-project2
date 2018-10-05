import os

from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit, join_room, leave_room

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

messages1 = {}


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/chat")
def chat():
    return render_template("chat.html")


@socketio.on("send message")
def send(data):
    messages1.update(data)
    # room = data['room']
    emit("announce chat", messages1, broadcast=True)


@socketio.on('join')
def on_join(data):
    nickname = data['nickname']
    room = data['room']
    join_room(room)
    emit(nickname + ' has entered the room.', room=room)


@socketio.on('leave')
def on_leave(data):
    nickname = data['nickname']
    room = data['room']
    leave_room(room)
    emit(nickname + ' has left the room.', room=room)


@socketio.on("my error event")
def on_my_event(data):
    raise RuntimeError()


@socketio.on_error_default
def default_error_handler(e):
    print(request.event["message"]) # "my error event"
    print(request.event["args"])    # (data,)


if __name__ == '__main__':
    socketio.run(app)
