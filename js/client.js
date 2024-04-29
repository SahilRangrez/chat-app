// const socket = io("http://localhost:8000");
const socket = io("http://localhost:8000", { transports: ["websocket"] });
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3');
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    if (position == 'left') {
        audio.play();
    }
}

const name = prompt("Enter your name to join: ");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`<strong>${name}</strong> joined the chat`, 'right')
})

socket.on('receive', data => {
    append(`<strong>${data.name}</strong>: ${data.message}`, 'left')
})
socket.on('left', name => {
    append(`<strong>${name}</strong> left the chat`, 'left')
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`<span class="bold">You:</span> ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})
