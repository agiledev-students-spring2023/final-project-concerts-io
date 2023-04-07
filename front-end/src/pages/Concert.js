import React, { useState, useEffect } from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import axios from "axios"
import './Concert.css';



function Concert(props) {
  const [concert, setConcert] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/ticketmaster/")
      .then((res) => res.json())
      .then((data) => {
        setConcert(data);
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);
 

    const handleClick = () => {
        alert("Added to favorites");
    }

    // if the user is not logged in, redirect them to the login route
    if (!props.user || !props.user.success) {
        return <Navigate to="/login?error=protected" />
    }

    return (
        <div className="Concert">
            <h1 className="Concert-header">Concerts.io</h1>
            <h2>{concert.name}</h2>
            <img src={concert.image} alt={concert.artist} />
            <p>{concert.date} at {concert.location}</p>
            <p>Example Concert Info</p>
            <a href={concert.ticketLink} className="Concert-link">Buy Tickets</a>
            <button onClick={handleClick} className="Concert-button">Add to Favorites</button>
        </div>
    );
}

export default Concert;