const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var moment = require('moment')
var mongodb = require('mongodb')
var server = require('http').Server(app)
var io = require('socket.io')(server, { origins: '*:*', pingInterval: 15000})
var port = process.env.PORT || 3009
const mongo_url = process.env.MONGO_URL
const { exec } = require('child_process')

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

    let ip = socket.handshake.address || '181.209.106.242'
    console.log(socket.handshake)
    exec(`./iplookup ${ip}`, (err, stdout, stderr) => {
      if (err) {
        console.log(err)
      } else {
        const parts = stdout.split("\t")
        if (parts[1]) {
          socket.country = parts[1].toLowerCase()
        } else {
          socket.country = 'unknown'
        }
      }
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
      socket.username = data
    })

    //listen on typing
    socket.on('typing', (data) => {
      socket.broadcast.emit('typing', { username : socket.username })
    })

    socket.on('message', data => {
      data.created = new Date()
      data.username = socket.username
      data.country = socket.country

      if (socket.username !== 'bot') {
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