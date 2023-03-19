import React  from 'react';
import {Navigate } from "react-router-dom"
import ConcertComponent from "../components/ConcertComponent"
import "./Recommended.css"

const Recommended = (props) => {
    const recommendedConcerts = [
        {
          id: 1,
          name: 'Example Concert',
          artist: 'Example Artist',
          date: 'Example Date',
          location: 'Example Venue',
          image: 'https://example.com/image.jpg',
          link: 'http://localhost:3000/concerts/1',
        },
        {
          id: 2,
          name: 'Example Concert',
          artist: 'Example Artist',
          date: 'Example Date',
          location: 'Example Venue',
          image: 'https://example.com/image.jpg',
          link: 'http://localhost:3000/concerts/2',
        },
        {
          id: 3,
          name: 'Example Concert',
          artist: 'Example Artist',
          date: 'Example Date',
          location: 'Example Venue',
          image: 'https://example.com/image.jpg',
          link: 'http://localhost:3000/concerts/3',
        },
    ];
    // if the user is not logged in, redirect them to the login route
    if (!props.user || !props.user.success) {
        return <Navigate to="/login?error=protected" />
      }
    return(
        <div className="Recommended">
            <div className="Recommended-header">
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

export default Recommended