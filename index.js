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

io.on('connection', (socket) => {
  console.log('User connected.')
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg)
  })
  socket.on('disconnect', () => {
    console.log('User disconnected.')
  })
})

http.listen(3000, () => {
  console.log('Listening on 3000.')
})
