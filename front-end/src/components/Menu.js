import React from 'react';
import {Link} from 'react-router-dom';
import "./Menu.css"
import aboutIcon from '../img/SVG/about.svg'
import homeIcon from "../img/SVG/homeIcon.svg"
import profileIcon from "../img/SVG/profileIcon.svg"

const Menu = (props) =>{
    if (props.user.success){
        return(
            <div className="menu-wrapper">
                <div className='menu-box'>
                    <img src={aboutIcon} alt="about"/>
                    <Link to="/about" style={{ textDecoration: 'none' }}>
                    <span>About</span>
                    </Link>
                </div>
                <div className='menu-box'>
                    <img src={homeIcon} alt="home"/>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                    <span>Home</span>
                    </Link>
                </div>
                <div className='menu-box'>
                    <img src={profileIcon} alt="profile"/>
                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                    <span>Profile</span>
                    </Link>
                </div>
            </div>
        )
    }
    else{
        return(
        <div className="menu-wrapper">
                <div className='menu-box'>
                    <Link to="/about" style={{ textDecoration: 'none' }}>
                    <span>About</span>
                    </Link>
                </div>
                <div className='menu-box'>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                    <span>Home</span>
                    </Link>
                </div>
                <div className='menu-box'>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <span>Login</span>
                    </Link>
                 </div>
         </div>
        )
    }
    
}

export default Menu