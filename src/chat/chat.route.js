const express = require('express');
const router = express.Router();
const io = require("socket.io");
const server = io.listen(3000)

const rooms = {}


router.get('/webchat', (req, res) => {
    res.render('./chat', {rooms: rooms})
})

router.post('/room', (req, res) => {
    // if (rooms[req.body.room] != null){
    //     return res.redirect('/')
    //     //add popup later
    // }

    rooms[req.body.room] = { users: {}}

    res.redirect(req.body.room)
    //Send message new room recreated
    server.emit('room-created', req.body.room)
})

router.get('/:room', (req, res) => {
  if (rooms[req.params.room] == null) {
    return res.redirect('/')
  }
  res.render('./room', { roomName: req.params.room })
})

// server.listen(3000)

server.on('connection', socket => {
  socket.on('new-user', (room, name) => {
    socket.join(room)
    rooms[room].users[socket.id] = name
    socket.to(room).broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', (room, message) => {
    socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
  })
  socket.on('disconnect', () => {
    getUserRooms(socket).forEach(room => {
      socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id])
      delete rooms[room].users[socket.id]
    })
  })
})

function getUserRooms(socket) {
    return Object.entries(rooms).reduce((names, [name, room]) => {
      if (room.users[socket.id] != null) names.push(name)
      return names
    }, [])
}

module.exports = router;