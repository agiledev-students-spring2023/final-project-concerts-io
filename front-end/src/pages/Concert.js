import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import './Concert.css';


const concertInfo = {
    name: 'Example Concert',
    artist: 'Example Artist',
    date: 'Example Date',
    location: 'Example Venue',
    image: 'https://example.com/image.jpg',
    ticketLink: 'https://example.com/tickets',
};
//dummy data for concerts
const exampleConcerts = [
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
}]


function Concert() {
    const [concert, setConcert] = useState([])

    const { concertId } = useParams() // get any params passed to this component from the router
  
    useEffect(() => {
    const foundConcert = exampleConcerts.filter(x =>{return x.id==concertId})[0]
    setConcert(foundConcert)
    },[])

    const handleClick = () => {
        alert("Added to favorites");
    }

    return (
        <div className="Concert">
            <h1 className="Concert-header">Concerts.io</h1>
            <h2>{concert.name}</h2>
            <img src={concert.image} alt={concert.artist} />
            <p>{concert.date} at {concertInfo.location}</p>
            <p>Example Concert Info</p>
            <a href={concert.ticketLink} className="Concert-link">Buy Tickets</a>
            <button onClick={handleClick} className="Concert-button">Add to Favorites</button>
        </div>
    );
}

export default Concert;