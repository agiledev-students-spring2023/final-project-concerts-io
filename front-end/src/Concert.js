import React from 'react';
import './Concert.css';


const concertInfo = {
    name: 'Example Concert',
    artist: 'Example Artist',
    date: 'Example Date',
    location: 'Example Venue',
    image: 'https://example.com/image.jpg',
    ticketLink: 'https://example.com/tickets',
};


function Concert() {

    const handleClick = () => {
        alert("Added to favorites");
    }

    return (
        <div className="Concert">
            <h1 className="Concert-header">Concerts.io</h1>
            <h2>{concertInfo.name}</h2>
            <img src={concertInfo.image} alt={concertInfo.artist} />
            <p>{concertInfo.date} at {concertInfo.location}</p>
            <p>Example Concert Info</p>
            <a href={concertInfo.ticketLink} className="Concert-link">Buy Tickets</a>
            <button onClick={handleClick} className="Concert-button">Add to Favorites</button>
        </div>
    );
}

export default Concert;