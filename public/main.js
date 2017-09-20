const io = require('socket.io-client')
const socket = io()

const $form = document.getElementById('form')
$form.addEventListener('submit', onSubmit, false)

function onSubmit(event) {
  event.preventDefault()
  console.log("submitted")
}
