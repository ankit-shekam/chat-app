import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        {/*   1.   */}
        <Link onClick={(e) => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>     
          <button className="button mt-20" type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  )
  
}

export default Join;

//  1. 
//  the onclick prevents the app to go to the link in case it not correct(missing info, or some other cause)
//  if all the info is there onclick does nothing and we are taken to the URL specified by the to
//  the to is used to pass data in the URL itself rather than using some props
//  although not really secure but it is easier