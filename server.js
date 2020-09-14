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
  log(`${req.ip} /`)
  res.render('index', { now: now })
})

app.get('/room', (req, res) => {
  log(`${req.ips} /room`)
  res.redirect(`/r/${uuid.generate()}`)
})

app.get('/r/:room', (req, res) => {
  log(`${req.ip} /r/${req.params.room}`)
  res.render('room', { roomId: req.params.room, now: now })
})

app.get('/cast', (req, res) => {
  log(`${req.ip} /cast`)
  res.redirect(`/c/${uuid.generate()}`)
})

app.get('/c/:room', (req, res) => {
  log(`${req.ip} /c/${req.params.room}`)
  res.render('cast', { roomId: req.params.room, now: now })
})

app.get('/w/:room', (req, res) => {
  log(`${req.ip} /w/${req.params.room}`)
  res.render('watch', { roomId: req.params.room, now: now })
})

app.post('/debug', (req, res) => {
  log(`${req.ip} error: ${req.body.err}`)
})

app.get('/:view', (req, res) => {
  if (req.params.view.indexOf('.') > -1) {
    return false
  }
  log(`${req.ip} /${req.params.view}`)
  const path = `./views/${req.params.view}.ejs`
  fs.access(path, fs.F_OK, (err) => {
    if (err) {
      console.log('view not found: ' + path)
      res.render('404', { now: now })
      return
    }
    res.render(req.params.view, { now: now })
  })
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

    socket.on('state', data => {
      if (peers[roomId][client.id]) {
        peers[roomId][client.id][data.prop] = data.state
        socket.to(roomId).broadcast.emit('state', data, client.id)
      }
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

server.listen(process.env.PORT || 3000)