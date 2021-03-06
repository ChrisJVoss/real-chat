import io  from ('socket.io-client')
const socket = io()
import React from ('react')
import ReactDOM from 'react-dom'

function onSubmit(event) {
  event.preventDefault()
  const $message = document.getElementById('message')
  socket.emit('send message', $message.value)
  $message.value = ''
}
socket.on('send message', (data) => {
  let $chat = document.getElementById('chat')
  let $newMessage = document.createElement('div')
  let $username = document.createElement('strong')
  $newMessage.classList.add('well')
  $newMessage.textContent = data.user + ': ' + data.msg
  $chat.appendChild($newMessage)
  $chat.scrollTop = 999999999
})

const $form = document.getElementById('messageForm')
$form.addEventListener('submit', onSubmit, false)

function getUsername(event) {
  event.preventDefault()
  const $username = document.getElementById('username')
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
  $users.innerHTML = ''
  for (let i = 0; i <  data.length; i++) {
    const $li = document.createElement('li')
     $li.textContent = data[i]
     $users.appendChild($li)
  }
})

class userForm extends React.Component {
  renderForm() {
    return (
      <div class="row" id="userFormArea">
        <div class="col-md-12">
          <form id="userForm">
            <div class="form-group">
              <label>Enter Username</label>
              <input class="form-control" id="username"/>
              <br/>
              <input type="submit" class="btn btn-primary" value="Login"/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

class messageArea extends React.Component {
  renderMessage() {
    return (
      <div class="row hidden" id="messageArea">
        <div class="col-md-4">
          <div class="well">
            <h3>Online Users</h3>
            <ul class="list-group" id="users"></ul>
          </div>
        </div>
        <div class="col-md-8">
          <div class="chat" id="chat"></div>
        </div>
        <div class="col-md-8 messageForm">
          <form id="messageForm">
            <div class="form-group">
              <label>Enter Message</label>
              <textarea class="form-control" id="message"></textarea>
              <br/>
              <input type="submit" class="btn btn-primary" value="Send Message"/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
