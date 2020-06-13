import React from 'react';
import './Message.css';

// to use emojis 
import ReactEmoji from 'react-emoji';


const Message = ({ message: { text, user }, name }) => {
	// a message consists of text(body) and the user and user(name)

  let isSentByCurrentUser = false;

	// remove spaces(trim) and conver all to lower case(toLowerCase)
  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
				// if message sent by current user
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName} </p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
					// message sent by some other user
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10">{user}</p>
          </div>
        )
  );
}

export default Message;