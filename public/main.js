const io = require('socket.io-client')
const socket = io()

function onSubmit(event) {
  event.preventDefault()
  console.log('submitted')
  socket.emit('chat message', document.getElementById('message').value)
  document.getElementById('message').value = ''
}

const $form = document.getElementById('form')
$form.addEventListener('submit', onSubmit, false)
