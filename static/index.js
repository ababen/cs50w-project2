document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#form').onsubmit = function() {
        const nickname = document.querySelector('#nickname').value;
        if (!localStorage.getItem('nickname'))
        localStorage.setItem('nickname', nickname);
        };
    });