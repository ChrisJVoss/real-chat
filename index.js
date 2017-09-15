const express = require 'express'
const bodyParser = require('body-parser')
const path = require('path')
const socket = require('socket.io')

const app = express()
const io = socket(app)

const publicPath = path.join(_dirname, 'public')
const staticMiddleware = express.static(publicPath)
const jsonParser = bodyParser.json()

app.use(staticMiddleware)

app.use(jsonParser)

app.listen(3000, () => {
  console.log('Listening on 3000.')
})
