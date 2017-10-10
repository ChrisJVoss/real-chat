const io = require('socket.io-client')
const socket = io()

function onSubmit(event) {
  event.preventDefault()
  console.log('submitted')
  const $message = document.getElementById('message')
  socket.emit('chat message', $message.value)
  $message.value = ''
}

const $form = document.getElementById('messageForm')
$form.addEventListener('submit', onSubmit, false)

function getUsername(event) {
  event.preventDefault()
  const $username = document.getElementsByClassName('username')
  socket.emit('new user', $username.value, (data) => {
    if (data) {
      const $userFormArea = document.getElementById('userFormArea')
      const $messageArea = document.getElementById('messageArea')
      $messageArea.classList.remove('hidden')
      $userFormArea.classList.add('hidden')

    }
  })
}

const $userForm = document.getElementById('userForm')
$userForm.addEventListener('submit', getUsername, false)

socket.on('get users', (data) => {
  const $users = document.getElementById('users')
  for (let i = 0; i <  data.length; i++) {
    const $li = document.createElement('li')
     $li.textContent = data[i]
     $users.appendChild($li)
  }
})

/* class HashRouter {
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
*/
