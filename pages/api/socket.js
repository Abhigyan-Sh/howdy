import { Server } from 'socket.io'

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', (socket) => {
      console.log('connected to socket.io')

      socket.on('setup', (userData) => {
        socket.join(userData._id)
        socket.emit('connected')
      })

      socket.on('join chat', (room) => {
        socket.join(room)
        console.log('user joined room: ' + room)
      })

      socket.on('new message', (newReceivedMessage) => {
        const message = newReceivedMessage.message
        const chat = message.chat

        if (!chat.users) return console.log('chat.users is undefined')

        chat.users.forEach((user) => {
          if(user._id === message.sender._id) return
          socket.in(user._id).emit('message received', message)
        //   socket.in(chat._id).emit('message received', message)
        })
      })

      socket.on('typing', (room) => {
        socket.in(room).emit('typing')
      })

      socket.on('typing stopped', (room) => {
        socket.in(room).emit('typing stopped')
      })

      socket.off('setup', () => {
        console.log('user disconnected')
        socket.leave(userData._id)
      })
    })
  }
  res.end()
}

export default SocketHandler