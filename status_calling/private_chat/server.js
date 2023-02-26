const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = 5500

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

// function
const { userJoin, getRoomUsers, getCurrentUser, userLeave } = require("./utils/users")
const formateMessage = require("./utils/messages")


const boatName = "Chatify Server";



app.use(express.static(__dirname + '/public1'))

app.get('/', (req, res) => {
   //res.send("Welcome")
     res.sendFile(__dirname + '/index1.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
    socket.on("joinRoom", ({ username, room }) => {


        const user = userJoin(socket.id, username, room)
    
        socket.join(user.room);

        // Welcome current 
        socket.emit("message", formateMessage(boatName, "Welcome to Chatify Server"))

        // broadcat to other users
        socket.broadcast.to(user.room).emit("message", formateMessage(boatName, `${user.username} has joined the chat`))

        //  Get all room users
        io.to(user.room).emit("roomUsers", {
            room: user.room, users: getRoomUsers(user.room)
        })

    })
    socket.on("chatMessage",(msg)=>{
        const user = getCurrentUser(socket.id)
        io.to(user.room).emit("message",formateMessage(user.username,msg))
  });
  socket.on("disconnect",()=>{
      try {
        io.to(user.room).emit("message",formateMessage(boatName,`${user.username} has left the chat`))

        //  Get all room user
        io.to(user.room).emit("roomUsers", {
          room: user.room, users: getRoomUsers(user.room)
      })  
      } catch (error) {
        console.log(error)
      }
      const user = userLeave(socket.id)


  })

})