import React from "react";
import proPic from "../img/demoUser.png"
import './User.css'
const demoUser = {
    proPic: "default",
    username: "averageConcertEnjoyer",
    email: "averageConcertEnjoyer@gmail.com"
}


const User = () =>{
    return(
        <div className="user-wrapper">
            <div id="proPic">
                <img src={proPic} alt="Profile"></img>
            </div>
            <div id="username">
                <h2>Username: {demoUser.username}</h2>
            </div>
            <div id="email">
                <h2>Email: {demoUser.email}</h2>
            </div>
        </div>
    )
}

export default User