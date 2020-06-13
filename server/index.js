const http = require('http');
const express = require('express');
const socketio = require('socket.io');
// const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
// instance of the socket.io, every instance of it has a unique id, every user has one instance, so every user has a unique socket.id
const io = socketio(server);           

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

// app.use(cors());
app.use(router);

// 1.
io.on('connect', (socket) => {   

	// listener for emit named 'join'
	socket.on('join', ({ name, room }, callback) => {  
	
		// addUser can either return an error or a user
		const { error, user } = addUser({ id: socket.id, name, room });		

		if(error) {
			return callback(error);		
			// callabck function is user for error handling
		}

		// till now no error so we are still in the join function
		// so call an inbuilt function to join the specified room
		socket.join(user.room);

		// admin generated message to the new joinee
		socket.emit('message', { user: 'admin', text: `hello ${user.name}, welcome to room ${user.room}.`});
		// admin generated broadcast(for all others except the new joinee) in the specified room
		socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `new guy named ${user.name} has joined!` });

		//     io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });


		callback();
  });

	// userGenerated messages are named SendMessage
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

		// a builtin method to send data(message) to the specified room
    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

	// 2.
	socket.on('disconnect', () => {       
		// const user = removeUser(socket.id);

		// if(user) {
		// 	io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
		// 	io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
		// }
	})

});







//  2.
//  io.on in an inbuilt function which has a specific inbuilt keyword, 'connection' in this case
//  when this is encountered the specific function is run on that instance

//  3.
//  now the io instance is going on so just call keyword wala function on the socket itself, this one works on disconnect