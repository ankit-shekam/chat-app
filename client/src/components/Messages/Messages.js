import React from 'react';

// pre-made scroll for react project, creates a scroll bar as soon as stacked messages become greater in height than the container of messages
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';
import './Messages.css';

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {/* one by one render all the messages */}
    {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
  </ScrollToBottom>
);

export default Messages;