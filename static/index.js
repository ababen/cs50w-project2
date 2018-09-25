document.addEventListener('DOMContentLoaded', () => {
    // Initialize new Chat
    const nickname = document.querySelector('#nickname').value;
    request.open('POST', '/chat');

    // Initialize local storage
    document.querySelector('button').onclick = () => {
      if (!localStorage.getItem('nickname'))
        localStorage.setItem('nickname', nickname));
      }

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure buttons
    socket.on('connect', () => {

        // TODO Replace function below
        // Each button should emit a "submit vote" event
        document.querySelectorAll('button').forEach(button => {
            button.onclick = () => {
                const selection = button.dataset.vote;
                socket.emit('submit vote', {'selection': selection});
            };
        });
    });

    // TODO Replace function below
    // When a new vote is announced, add to the unordered list
    // socket.on('vote totals', data => {
    //    document.querySelector('#yes').innerHTML = data.yes;
    //    document.querySelector('#no').innerHTML = data.no;
    //    document.querySelector('#maybe').innerHTML = data.maybe;
    });
});
