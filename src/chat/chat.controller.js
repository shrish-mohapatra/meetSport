const io = require("socket.io");
const server = io.listen(3000) //creates chat server on port 3k

const rooms = {} //holds rooms


exports.roomPage = (req, res) => {
    res.render('./chat', {rooms: rooms})
}

exports.createRoom = (req, res) => {
    const hashUrl = roomHashKey(req.session.username, req.params.friendName)
    console.log(req.session.username, req.params.friendName)

    //can't create and join duplicate rooms
    if (rooms[hashUrl] != null){
        console.log('dup room')
         return res.redirect(hashUrl + '/' + req.session.username)
         //add popup later
    }

    rooms[hashUrl] = { users: {}} //creates index in room, ties room name to null users to fill

    res.redirect(hashUrl + '/' + req.session.username) //rendered below

    //Send message new room recreated
    server.emit('room-created', hashUrl)
}

exports.chatPage = (req, res) => {
    console.log('req.params: ' + req.params.username)
    if (rooms[req.params.room] == null) {
      return res.redirect('/')
    }
    res.render('./room', { roomName: req.params.room, username: req.params.username}) //room => room name that is passed based on redirect + pass room name in route
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
        roomHashKey('michael', 'shrish')
        return names //which room user with socket if is a part of
      }, [])
  }

  roomHashKey = (user1, user2) => {
      let compare = user1.localeCompare(user2)
      let order = [user1, user2]
      if (compare == -1) {
        order.reverse()
    }
    return hashCode(order[0] + order[1])
  }

 hashCode = (s) => {
    var h = 0, l = s.length, i = 0;
    if ( l > 0 )
      while (i < l)
        h = (h << 5) - h + s.charCodeAt(i++) | 0;
        console.log(h)
    return h;
  };

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