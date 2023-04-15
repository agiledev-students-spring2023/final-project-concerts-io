import React from 'react';
import proPic from '../img/demoUser.png';
import './User.css';
import { Link } from 'react-router-dom';

const User = (props) => {
  return (
    <div className="user-wrapper">
      <div id="profile">
        <img src={props.details.propic || proPic} alt="Profile"></img>
        <h3>Username: {props.details.username}</h3>
      </div>
      <div id="details">
        <h3>Email: {props.details.email}</h3>
        <div className="logOut">
          <Link to="/logout">Logout</Link>
          <br />
          <Link to="/edit-profile">Edit Profile</Link>
        </div>
        <Link to="/connection" style={{ textDecoration: 'none' }}>
          <span>Connect Streaming Services</span>
        </Link>
      </div>
    </div>
  );
};

export default User;
