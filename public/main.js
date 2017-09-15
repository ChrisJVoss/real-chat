const io = require('socket.io-client')
const socket = io()

function sendMessage = () {
  const $form = document.getElementById('form')
  $form.submit( () => {
    socket.emit('chat message', document.getElementById('message').value)
    document.getElementById('message').value = ''
    return false
  })
}
sendMessage()
