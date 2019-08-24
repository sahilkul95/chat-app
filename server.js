const express = require('express')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', {title: "Simple chat app"})
})

server = app.listen(3000)
console.log('Server is listening on http://localhost:3000')

const io = require('socket.io')(server)

io.on('connection', (socket) => {
  console.log('New user connected.')
  socket.username = "Anonymous"
  socket.on("change_username", (data) => {
    socket.username = data.username
  })
})
