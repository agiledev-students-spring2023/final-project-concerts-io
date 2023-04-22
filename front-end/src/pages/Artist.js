import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import './Artist.css';
import axios from 'axios';
import ConcertComponent from '../components/ConcertComponent';

const Artist = (props) => {
  const jwtToken = localStorage.getItem('token');
  const [concerts, setConcerts] = useState([]);
  const [artist, setArtist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);

  const { artistId } = useParams(); // get any params passed to this component from the router

  useEffect(() => {
    fetch(`http://localhost:3000/artist/${artistId}`, {
      headers: { Authorization: `JWT ${jwtToken}` },
    })
      .then((res) => {
        if (res.status === 401) {
          setIsLoggedIn(false);
        }
        return res.json();
      })
      .then((data) => {
        setArtist(data);
        fetch(`http://localhost:3000/TicketmasterSearch/${data.name}`, {
          headers: { Authorization: `JWT ${jwtToken}` },
        })
          .then((res) => {
            if (res.status === 401) {
              setIsLoggedIn(false);
            }
            return res.json();
          })
          .then((data) => {
            console.log(data)
            setConcerts(data);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); //will run only once

  // if the user is not logged in, redirect them to the login route
  if (!isLoggedIn) {
    return <Navigate to="/login?error=protected" />;
  }

  return (
    <div className="Artist">
      <h1>{artist.name}</h1>
      <h2>Upcoming Concerts</h2>
      <div className="concerts-container">
        <div className="artistConcerts-container">
        <div className="savedConcerts-container">
          {concerts.map((concert) => (
          <div key={concert.ticketmasterID} className="saved-concert">
            <ConcertComponent key={concert.ticketmasterID} details={concert}/>
          </div>
        ))}
      </div>
        </div>
      </div>
    </div>
  );
};

export default Artist;
