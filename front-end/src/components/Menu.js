import React from 'react';
import {Link} from 'react-router-dom';
import "./Menu.css"


const Menu = (props) =>{
    if (props.user.success){
        return(
            <div className="menu-wrapper">
                <div className='menu-box'>
                <Link to="/about">
                    <h2>About</h2>
                </Link>
                </div>
                <div className='menu-box'>
                    <Link to="/">
                    <h2>Home</h2>
                    </Link>
                </div>
                <div className='menu-box'>
                    <Link to="/profile">
                    <h2>Profile</h2>
                    </Link>
                </div>
            </div>
        )
    }
    else{
        return(
        <div className="menu-wrapper">
                <div className='menu-box'>
                    <Link to="/about">
                        <h2>About</h2>
                    </Link>
                </div>
                <div className='menu-box'>
                    <Link to="/">
                    <h2>Home</h2>
                    </Link>
                </div>
                <div className='menu-box'>
                    <Link to="/login"><h2>Login</h2></Link>
                 </div>
         </div>
        )
    }
    
}

export default Menu