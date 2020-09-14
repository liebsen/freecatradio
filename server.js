const fs = require('fs')
const express = require('express')
const app = express()
const uuid = require('shortid')
const now = Math.round(new Date().getTime() / 1000)
const bodyParser = require('body-parser')

if (process.env.SSL) {
  const sslOptions = {
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CERT)
  }
  var server = require('https').Server(sslOptions, app)
} else {
  var server = require('http').Server(app)
}

const io = require('socket.io')(server)
var peers = {}
var log = (text) => {
  let now = new Date().toISOString()
  fs.appendFile('app.log', `${now} ${text}\n`, (err) => {
    if (err) throw err;
  })
}

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.set('trust proxy', true)
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(express.json())

app.get('/', (req, res) => {
  res.render('index', { now: now })
})

io.on('connection', socket => {
  console.log(`connection`)
  socket.on('join-room', (roomId, client) => {
    socket.join(roomId)
    console.log(`join-room ${roomId} ${client.id}`)

    if (!peers[roomId]) {
      peers[roomId] = {}
    }

    if (!peers[roomId][client.id]) {
      peers[roomId][client.id] = client
    }

    console.log('room size: ' + Object.keys(peers[roomId]).length)
    socket.to(roomId).broadcast.emit('user-connected', client)
    io.to(roomId).emit('peers', peers[roomId])

    socket.on('chat', data => {
      socket.to(roomId).broadcast.emit('chat', data)
    })

    socket.on('message', data => {
      socket.to(roomId).broadcast.emit('message', data)
    })

    socket.on('disconnect', () => {
      console.log(`disconnect ${client.id}`)
      let room = peers[roomId]
      if (room) {
        if (room[client.id]) {
          delete peers[roomId][client.id]
        }
        if (!Object.keys(peers[roomId]).length) {
          console.log('--- room deleted')
          room = null
          delete peers[roomId]
        }
        io.to(roomId).emit('peers', room)
        socket.to(roomId).broadcast.emit('user-disconnected', client)
        socket.leave(roomId)
      }
    })
  })
})

server.listen(process.env.PORT || 9000)