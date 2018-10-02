document.addEventListener('DOMContentLoaded', () => {
    
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

        // Button should emit a "send meesage" event
        document.querySelector('#new-message').onsubmit = () => {

                // const nickname = localStorage.getItem('nickname');
                var date = new Date();
                var timestamp = date.getTime();
                var data = {'message': document.querySelector('#message').value, 'timestamp': timestamp, 'nickname': localStorage.getItem('nickname')};
                             
                socket.emit('send message', data);
                
                // Clear input field and disable button again
                document.querySelector('#message').value = '';
                document.querySelector('#submit').disabled = true;
        };
    });

    // When a new vote is announced, add to the unordered list
    socket.on('announce chat', data => {
        const li = document.createElement('li');
        li.innerHTML = `From: ${data.nickname} at ${data.timestamp} says ${data.message}`;
        document.querySelector('#messages').append(li);
        return false;
    });
});