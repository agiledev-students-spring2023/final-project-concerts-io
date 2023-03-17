import React from "react";
import proPic from "../img/demoUser.png"
import './User.css'

const User = (props) =>{
    return(
        <div className="user-wrapper">
            <div id="proPic">
                <img src={proPic} alt="Profile"></img>
            </div>
            <div id="username">
                <h2>Username: {props.details.username}</h2>
            </div>
            <div id="email">
                <h2>Email: {props.details.email}</h2>
            </div>
        </div>
    )
}

export default User