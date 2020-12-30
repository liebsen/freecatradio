const express = require('express')
const app = express()
const bodyParser = require('body-parser')

var server = require('http').Server(app)
var port = process.env.PORT || 3009

app.set('view engine', 'html')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(express.json())

server.listen(port, () => {
  console.log(`Server running at https://localhost:${port}`)
})