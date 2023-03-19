import React, { useState, useEffect } from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import axios from "axios"
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
  },
  {
    id: 4,
    name: 'Example Concert',
    artist: 'Example Artist',
    date: 'Example Date',
    location: 'Example Venue',
    description: "Example Description",
    location: 'Example Venue',
    image: 'https://example.com/image.jpg',
    ticketLink: 'https://example.com/tickets'
  },
  {
    id: 5,
    name: 'Example Concert',
    artist: 'Example Artist',
    date: 'Example Date',
    location: 'Example Venue',
    description: "Example Description",
    location: 'Example Venue',
    image: 'https://example.com/image.jpg',
    ticketLink: 'https://example.com/tickets'
  },
  {
    id: 6,
    name: 'Example Concert',
    artist: 'Example Artist',
    date: 'Example Date',
    location: 'Example Venue',
    description: "Example Description",
    location: 'Example Venue',
    image: 'https://example.com/image.jpg',
    ticketLink: 'https://example.com/tickets'
  },
  {
    id: 7,
    name: 'Example Concert',
    artist: 'Example Artist',
    date: 'Example Date',
    location: 'Example Venue',
    description: "Example Description",
    location: 'Example Venue',
    image: 'https://example.com/image.jpg',
    ticketLink: 'https://example.com/tickets'
  },
]


function Concert() {
  const [concert, setConcert] = useState([])

  useEffect(() => {
    axios("https://my.api.mockaroo.com/concerts/123.json?key=54687d90")
     .then(response => {
       setConcert(response.data)
     })
     .catch(err => {
       console.log(`Get Nae Naed--No Data For you`)
       console.error(err)
       const backupData = [
        {
          id: 1,
          name: "John Smith live at the Purple Lounge",
          artist: "John Smith",
          date: "September 22, 2040",
          description: "John Smith debuts his new record for the first time live",
          location: 'Example Venue',
          image: 'https://example.com/image.jpg',
          ticketLink: 'https://example.com/tickets',
        }
       ]
       setConcert(backupData)
     })
 }, []) 

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
            <p>{concert.date} at {concertInfo.location}</p>
            <p>Example Concert Info</p>
            <a href={concert.ticketLink} className="Concert-link">Buy Tickets</a>
            <button onClick={handleClick} className="Concert-button">Add to Favorites</button>
        </div>
    );
}

export default Concert;