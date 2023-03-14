import React from "react"
import { Link } from "react-router-dom"
import "./About.css"

const About = props => {
    return (
      <div className="About">
        <h2>Concerts.io</h2>
          <p className="paragraph">
          Concerts.io is a website that shows you nearby concerts based on your music taste. 
          Users will receive weekly newsletter updates of shows happening nearby 
          and also recently announced shows taking place in the future. 
          Through the website, you will be able to see important details about each concert such as the date and time of the show, 
          ticket prices, age requirement, and a link to purchase. 
          Users will be able to save shows they want to go to and receive reminders of upcoming shows they have tickets for. 
          </p>
        <h2>Mission Statement</h2>
          <p className="paragraph">
          Concerts.io mission is to make the concert-going experience easy for all users, 
          freeing them from the hassle and worry of missing out on their favorite band's show.
          </p>
        <h2>Contact Emails</h2>
          <p className="paragraph">
            concert_io@nyu.edu
          </p>

        {/* <div className="flex-container">
          <div className="link">About</div>
          <div className="link">Home</div>
          <div className="link">Profile</div>
        </div> */} 
        {/* command + / */}
      </div>
    )
  }
  
  export default About