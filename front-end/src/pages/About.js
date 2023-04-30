import React from "react"
import { Link } from "react-router-dom"
import "./About.css"

const About = props => {
    return (
      <div className="About">
        <h2>What is Concerts.io ?</h2>
          <p className="paragraph">
          Concerts.io is a website that shows you nearby concerts based on your music taste. 
          Users will receive weekly newsletter updates of shows happening nearby 
          and also recently announced shows taking place in the future. 
          Through the website, you will be able to see important details about each concert such as the date and time of the show, 
          ticket prices, age requirement, and a link to purchase. 
          Users will be able to save shows they want to go to and receive reminders of upcoming shows they have tickets for. 
          </p>
        <h2>Our Mission Statement</h2>
          <p className="paragraph">
          Concerts.io mission is to make the concert-going experience easy for all users, 
          freeing them from the hassle and worry of missing out on their favorite band's show.
          </p>
        <h2>Get in Touch with Us !</h2>
          <p className="paragraph">
            please email concert_io@nyu.edu
          </p>
        <div className="feedback">
          <p> This is a feedback form.</p>
          <h2>Help Us Make Concert.io Better</h2>
          <form id= "form">
            <label for="name">Name</label>
            <input name ="name " type="text" id = "name" />
            <label for="email">Name</label>
            <input name ="email" type="text" id = "email" />
            <label for="designation">Name</label>
            <input name ="designation" type="text" id = "designation" />
            <label for="feedback">Name</label>
            <textarea name ="feedback" type="text" id = "feedback"></textarea>
            <button type="submit">SUBMIT</button>

          </form>
        </div>
        <div id="loading">
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
        </div>

        <div id="status">

        </div>

      </div>


    )
  }
  
  export default About