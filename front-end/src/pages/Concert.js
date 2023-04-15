import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import './Concert.css';

function Concert(props) {
  const jwtToken = localStorage.getItem('token');
  const [concert, setConcert] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);
  const id = window.location.pathname.substring(10);
  useEffect(() => {
    fetch(`http://localhost:3000/ticketmaster/${id}`, {
      headers: { Authorization: `JWT ${jwtToken}` },
    })
      .then((res) => {
        if (res.status === 401) {
          setIsLoggedIn(false);
        }
        res.json();
      })
      .then((data) => {
        setConcert(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClick = () => {
    alert('Added to favorites');
  };
  if (!isLoggedIn) {
    return <Navigate to="/login?error=protected" />;
  }

  return (
    <div className="Concert">
      <h1 className="Concert-header">Concerts.io</h1>
      <h2>{concert.name}</h2>
      <img src={concert.image} alt={concert.artist} />
      <p>
        {concert.date} at {concert.location}
      </p>
      <p>Example Concert Info</p>
      <a href={concert.ticketLink} className="Concert-link">
        Buy Tickets
      </a>
      <button onClick={handleClick} className="Concert-button">
        Add to Favorites
      </button>
    </div>
  );
}

export default Concert;
