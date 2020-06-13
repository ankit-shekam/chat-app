import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './Infobar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online" />
      <h3> Room - {room}</h3>
    </div>
    <div className="rightInnerContainer">
			{/* when user clicks this anchor it will close the chatRoom and take you back to the signin page */}
      <a href="/"><img src={closeIcon} alt="close" /></a>
    </div>
  </div>
);

export default InfoBar;