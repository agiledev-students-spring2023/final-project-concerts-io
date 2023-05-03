import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import aboutIcon from '../img/SVG/about.svg';
import homeIcon from '../img/SVG/homeIcon.svg';
import profileIcon from '../img/SVG/profileIcon.svg';

const Menu = (props) => {
  if (localStorage.getItem('token')) {
    return (
      <div className="menu-wrapper">
        <div className="menu-box">
          <Link to="/about" className="full-size-link">
            <img src={aboutIcon} alt="about" />
            <span>About</span>
          </Link>
        </div>
        <div className="menu-box">
          <Link to="/" className="full-size-link">
            <img src={homeIcon} alt="home" />
            <span>Home</span>
          </Link>
        </div>
        <div className="menu-box">
          <Link to="/profile" className="full-size-link">
            <img src={profileIcon} alt="profile" />
            <span>Profile</span>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="menu-wrapper">
        <div className="menu-box">
          <Link to="/about" className="full-size-link">
            <span>About</span>
          </Link>
        </div>
        <div className="menu-box">
          <Link to="/" className="full-size-link">
            <span>Home</span>
          </Link>
        </div>
        <div className="menu-box">
          <Link to="/login" className="full-size-link">
            <span>Login</span>
          </Link>
        </div>
      </div>
    );
  }
};

export default Menu;
