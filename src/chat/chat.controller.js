const io = require("socket.io");
const server = io.listen(3000) //creates chat server on port 3k

const rooms = {}


exports.roomPage = (req, res) => {
    res.render('./chat', {rooms: rooms})
}

exports.createRoom = (req, res) => {
    //can't create and join duplicate rooms
    if (rooms[req.body.room] != null){
        console.log('dup room')
         return res.redirect('/chat')
         //add popup later
    }

    rooms[req.body.room] = { users: {}} //creates index in room, ties room name to null users to fill

    res.redirect(req.body.room) //rendered below

    //Send message new room recreated
    server.emit('room-created', req.body.room)
}

exports.chatPage = (req, res) => {
    if (rooms[req.params.room] == null) {
      return res.redirect('/')
    }
    res.render('./room', { roomName: req.params.room }) //room => room name that is passed based on redirect + pass room name in route
  }


server.on('connection', socket => {

    socket.on('new-user', (room, name) => {
      socket.join(room)
      rooms[room].users[socket.id] = name //binds socket id to name
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
        return names //which room user with socket if is a part of
      }, [])
  }

  // //middleware
// const logger = (req, res, next) => {
//   console.log("Rooms: ", rooms)
//   next();
// };

// router.use(logger);

// Rooms:  {
//   hi: {
//     users: { HbgpaGPWEFnhRS90AAAB: 'mike', KW9Vrwl5t8qvVJvWAAAD: 'shrish' }     
//   },
//   bruv: { users: {} }
// }