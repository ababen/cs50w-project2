document.addEventListener('DOMContentLoaded', () => {

    // Display nickname if available
    var nickname = localStorage.getItem('nickname');
    document.querySelector('#nickname').innerHTML = nickname;

    //Display room if available
    if (!localStorage.getItem('room')) {
        var room = "default";    
        localStorage.setItem('room', room);
    } else {
        document.querySelector('#room').innerHTML = room;
    }

    // By default, submit button is disabled
    document.querySelector('#submit').disabled = true;

    // Enable button only if there is text in the input field
    document.querySelector('#message').onkeyup = () => {
        if (document.querySelector('#message').value.length > 0)
            document.querySelector('#submit').disabled = false;
        else
            document.querySelector('#submit').disabled = true;
    };

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure buttons
    socket.on('connect', () => {

        // Button should emit a 'join' room event
        document.querySelector('#select_channel').onsubmit = () => {
            var data = {
                    'nickname': localStorage.getItem('nickname').timestamp,
                    'room': document.querySelector('#channel').value
            };
                localStorage.setItem('room', document.querySelector('#channel').value);
                socket.emit('leave', data);
                socket.emit('join', data);
            return false;
        };

        // Button should emit a "send meesage" event
        document.querySelector('#new-message').onsubmit = () => {
            var date = new Date();
            var timestamp = date.getTime();
            var room = ""
            var data = {
                'message': document.querySelector('#message').value,
                'timestamp': timestamp,
                'nickname': localStorage.getItem('nickname'),
                'room': room
            };

            socket.emit('send message', data);

            // Clear input field and disable button again
            document.querySelector('#message').value = '';
            document.querySelector('#submit').disabled = true;

            return false;
        };
    });

// When a new vote is announced, add to the unordered list
socket.on('announce chat', messages1 => {
    const li = document.createElement('li');
    //li.innerHTML = `From: ${data.nickname} at ${data.timestamp} says ${data.message}`;
    li.innerHTML = `From: ${messages1.nickname} at ${messages1.timestamp} says ${messages1.message} in ${messages1.room}`;
    document.querySelector('#messages').append(li);
    return false;
});
});