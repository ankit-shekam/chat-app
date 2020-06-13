// 1. 
import React, { useState, useEffect } from "react";

//  helps retreive data from the URL
import queryString from 'query-string';

import io from "socket.io-client";

// import TextContainer from '../TextContainer/TextContainer';
// import Messages from '../Messages/Messages';
import Infobar from '../Infobar/Infobar';
import Input from '../Input/Input';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  // const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';



  useEffect(() => {
		// 2.
    const { name, room } = queryString.parse(location.search);

		socket = io(ENDPOINT);
		
		// set the name and room to the state in the application
    setRoom(room);
    setName(name);

		// 3.
    socket.emit('join', { name, room }, () =>{

		});

		return() => {
			socket.emit('disconnect'); 	//calling the listener for disconnect

			socket.off();		// turn off this istance of client socket
		}
		
		// at the end if the useEffect is passed an array, it will only execute when the values in the array change and not arbitrarly
  }, [ENDPOINT, location.search]);
	
	

  useEffect(() => {
		// listen for messages using (socket.on('message'....))
		socket.on('message', (message) => {
			//spread all messages (...messages) and add a message to it
			setMessages([ ...messages, message ]);	
		});

		// only run when messages array changes
	}, [messages]);



	// for sending message
	const sendMessage = (event) => {
		// prevents the full browser refresh
		event.preventDefault();

			if(message) {
				// [() => setMessage('')] this callback clears the input field when the message is sent
				socket.emit('sendMessage', message, () => setMessage(''));
		}
	}	



  return (
    <div className="outerContainer">
      <div className="container">
				<Infobar room={room} />
				{/* <Messages messages={messages} name={name} /> */}
				<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
				{/* <input
					placeholder="Type a message..."
					value={message}
					onChange={(event) => setMessage(event.target.value)}
					onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null}
				/> */}
      </div>
      {/* <TextContainer users={users}/> */}
    </div>
  );
}

export default Chat;


// 1.
// these hooks (setState, useEffect) let us have some properties of class based components in functional components
// this leads to cleaner code
// setState takes two inputs state and a setter method to set that state
// the setState hook is same as using states in a class component in react  
// the useEffect hook is same as life cycle events componentDidMount and ComponentDidUpdate


// 2.
// this is taking the room and name data out of the URL
// location.search gives the second part of URL (the one with passed on data)
// querystring.parse converts this second part of URL into an Object containing (name, room)

// 3.
// emit are also special function that gets executed when called and the back has a listener for them 
// this listener has the same string [("join") int this case] when it matches some listener, that listener is executed

