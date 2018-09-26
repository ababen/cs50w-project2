document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#form').onsubmit = function() {
        const nickname = document.querySelector('#nickname').value;
        alert(`Hello ${nickname}!`);
    };
});
