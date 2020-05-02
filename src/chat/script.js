const socket = io('http://localhost:3000');
const roomContainer = document.getElementById('room-container'); //output msg
const messageContainer = document.getElementById('message-container'); //output msg
const messageForm = document.getElementById('send-container'); //output page
const messageInput = document.getElementById('message-input'); //input

//name handler
if(messageForm != null){
    const name = prompt('what is your name?')
    appendMessage('You joined the chat')
    socket.emit('new-user', roomName, name)

    messageForm.addEventListener('submit', e=> {
        e.preventDefault(); //prevent page refresh to keep msgs
        const message = messageInput.value
        appendMessage(`You: ${message}`); //uploads your message to your client (emit does it for others)
        socket.emit('send-chat-message', roomName, message);
        messageInput.value = ''
    })
}

socket.on('room-created', room => {
    const roomElement = document.createElement('div')
    roomElement.innerText = room
    const roomLink = document.createElement('a')
    roomLink.href = `/${room}`
    roomLink.innerText = 'join'
    roomContainer.append(roomElement)
    roomContainer.append(roomLink)
})
socket.on('chat-message', data =>{
    console.log(data);
    appendMessage(`${data.name}: ${data.message}`);
})

socket.on('user-connected', name =>{
    console.log(name);
    appendMessage(`${name} connected`);
})

socket.on('user-disconnected', name =>{
    console.log(name);
    appendMessage(`${name} disconnected`);
})

function appendMessage(message) {
    const messageElement = document.createElement('div') //create message container element
    messageElement.innerText = message
    messageContainer.append(messageElement)
}