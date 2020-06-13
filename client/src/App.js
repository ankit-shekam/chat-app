import React from 'react';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      {/* 1 */}
      <Route path="/" exact component={Join} />
      {/* 2 */}
      <Route path="/chat" component={Chat} />
    </Router>
  );
}

export default App;

// 1. the default component is join as the user opens the app he is greeted by the join component 
// it will ask the user for name and the RoomName

// 2. this the chat room where once you signin you chat with people