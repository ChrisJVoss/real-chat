const io = require('socket.io-client')
const socket = io()

function onSubmit(event) {
  event.preventDefault()
  console.log('submitted')
  const $message = document.getElementById('message')
  socket.emit('chat message', $message.value)
  $message.value = ''
}
socket.on('chat message', (msg) => {
  let $chat = document.getElementById('chat')
  let $newMessage = document.createElement('div')
  $newMessage.classList.add('well')
  $newMessage.textContent = msg
  $chat.appendChild($newMessage)
})

const $form = document.getElementById('messageForm')
$form.addEventListener('submit', onSubmit, false)

function getUsername(event) {
  event.preventDefault()
  const $username = document.getElementsByClassName('username')
  socket.emit('new user', $username.)
}

const $userForm = document.getElementById('userForm')
$userForm.addEventListener('submit', getUsername, false)


class HashRouter {
  constructor($views) {
    this.$views = $views
    this.isListening = false
  }
  match(hash) {
    const viewId = hash.replace('#', '')
    this.$views.forEach($view => {
      if ($view.id === viewId) {
        $view.classList.remove('hidden')
      }
      else {
        $view.classList.add('hidden')
      }
    })
  }
  listen() {
    if (this.isListening) return
    window.addEventListener('hashchange', () => {
      this.match(window.location.hash)
    })
    this.isListening = true
  }
}

const $views = document.querySelectorAll('.view')
console.log($views)
const router = new HashRouter($views)

router.listen()
