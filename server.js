const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongo_url = process.env.MONGO_URL
const { exec } = require('child_process')

var moment = require('moment')
var mongodb = require('mongodb')
var server = require('http').Server(app)
var io = require('socket.io')(server, { origins: '*:*', pingInterval: 15000})
var port = process.env.PORT || 3009
var users = []

app.set('view engine', 'html')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(express.json())

mongodb.MongoClient.connect(mongo_url, { useUnifiedTopology: true, useNewUrlParser: true }, function(err, database) {
  if(err) throw err

  const db = database.db(mongo_url.split('/').reverse()[0])

  io.on('connection', socket => {

    socket.username = "Anonymous"
    var ip = socket.handshake.headers["x-real-ip"] || '181.209.106.242'
    exec(`./iplookup ${ip}`, (err, stdout, stderr) => {
      if (err) {
        console.log(err)
      } else {
        const parts = stdout.split("\t")
        console.log(parts)
        if (parts[1]) {
          socket.country = parts[1].toLowerCase()
        } else {
          socket.country = 'unknown'
        }
      }
      io.sockets.emit('message', { username: 'botcat', country: 'botcat', message : `${socket.username} joined` })
      users = users.filter(e => e.sid != socket.id)
      users.push({sid: socket.id, country: socket.country, username: socket.username })
    })

    socket.on('disconnect', () => {
      io.sockets.emit('message', { username: 'botcat', country: 'botcat', message : `${socket.username} leaved` })
      users = users.filter(e => e.sid != socket.id)
    })

    socket.on('request_history', () => {
      db.collection('chat').find({
        created: {
          $gte: new Date(moment().subtract(1, 'day').format())
        }
      }).toArray((err, history) => {
        socket.emit('history', { history : history })  
      })      
    })

    socket.on('change_username', (data) => {
      const ousername = socket.username
      socket.username = data
      io.sockets.emit('message', { username: 'botcat', country: 'botcat', message : `${ousername} is now ${socket.username}` })
    })

    //listen on typing
    socket.on('typing', (data) => {
      socket.broadcast.emit('typing', { username : socket.username })
    })

    socket.on('message', data => {
      data.created = new Date()
      data.username = data.username || socket.username
      data.country = data.country || socket.country
      if (data.username !== 'botcat') {
        db.collection('chat').insertOne(data)
      }
		  io.sockets.emit('message', data);
    })
  })
})

server.listen(port, () => {
  console.log(`Server running at https://localhost:${port}`)
})

// MONGO_URL=mongodb://localhost:27017/freecatradio pm2 start server.js --name freecatradio