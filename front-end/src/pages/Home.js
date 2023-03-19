import React  from 'react';
import {Navigate } from "react-router-dom"
import "./Home.css"
import ConcertComponent from "../components/ConcertComponent"

const recommendedConcerts = [
    {
      id: 1,
      name: "John Smith live at the Purple Lounge",
      artist: "John Smith",
      date: "September 22, 2040",
      description: "John Smith debuts his new record for the first time live",
      location: 'Example Venue',
      image: 'https://example.com/image.jpg',
      ticketLink: 'https://example.com/tickets',
    },
    {
      id: 2,
      name: "Barry Ken live at the Red Lounge",
      artist: "Barry Ken",
      date: "August 15, 2040",
      description: "The legendary Barry Ken returns for his first performace in years",
      location: 'Example Venue',
      image: 'https://example.com/image.jpg',
      ticketLink: 'https://example.com/tickets',
    
},
{
    id: 3,
    name: 'Example Concert',
    artist: 'Example Artist',
    date: 'Example Date',
    location: 'Example Venue',
    description: "Example Description",
    location: 'Example Venue',
    image: 'https://example.com/image.jpg',
    ticketLink: 'https://example.com/tickets'
  }
]

const Home = (props) => {
    // if the user is not logged in, redirect them to the login route
    if (!props.user || !props.user.success) {
        return <Navigate to="/login?error=protected" />
      }
    return(
        <div className="Home">
            <div className="home-header">
                <h1>Concerts.io</h1>
                <h2>Recommended Concerts</h2>
            </div>
            <div className="concerts-container">
                <div className="recommendedConcerts-container">
                {recommendedConcerts.map(concert => (
                    <div key={concert.id} className="recommended-concert">
                    <ConcertComponent key = {concert.id} details = {concert} />
                    </div>
                ))}
                </div>
            </div>
        </div>
        
    )
};

export default Home