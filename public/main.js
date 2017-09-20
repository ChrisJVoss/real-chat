const io = require('socket.io-client')
const socket = io()

function onSubmit(event) {
  event.preventDefault()
  console.log('submitted')
  socket.emit('chat message', document.getElementById('message').value)
  document.getElementById('message').value = ''
}
socket.on('chat message', (msg) => {
  const $messages = document.getElementById('messages')
  let $sentMessage = document.createElement('li')
  $sentMessage.textContent = msg
  $messages.append($sentMessage)
})

const $form = document.getElementById('form')
$form.addEventListener('submit', onSubmit, false)
