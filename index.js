const express = require('express')
const app = express()
const http = require('http').Server(app)
const bodyParser = require('body-parser')
const path = require('path')
const socket = require('socket.io')

const io = socket(http)

const publicPath = path.join(__dirname, 'public')
const staticMiddleware = express.static(publicPath)
const jsonParser = bodyParser.json()

app.use(staticMiddleware)

app.use(jsonParser)

const connections = []
const users = []

io.on('connection', (socket) => {
  console.log('User connected.')
  connections.push(socket)
  socket.on('send message', (data) => {
    io.emit('send message', {msg: data, user: socket.username})
  })
  socket.on('disconnect', () => {
    console.log('User disconnected.')
    connections.splice(connections.indexOf(socket), 1)
    users.splice(users.indexOf(socket.username), 1)
    updateUsernames()
  })
  socket.on('new user', (data, callback) => {
    callback(true)
    socket.username = data
    users.push(socket.username)
    updateUsernames()
  })
  function updateUsernames() {
    io.emit('get users', users)
  }
})

http.listen(3000, () => {
  console.log('Listening on 3000.')
})
