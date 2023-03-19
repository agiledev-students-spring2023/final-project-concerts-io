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
                <h3>Username: {props.details.username}</h3>
            </div>
            <div id="email">
                <h3>Email: {props.details.email}</h3>
            </div>
            {props.login}
        </div>
    )
}

export default User