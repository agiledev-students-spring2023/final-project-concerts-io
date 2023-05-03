import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import './Artist.css';
import axios from 'axios';
import ConcertComponent from '../components/ConcertComponent';
import logo from '../img/SVG/logo.svg';

const Artist = (props) => {
  const jwtToken = localStorage.getItem('token');
  const [concerts, setConcerts] = useState([]);
  const [artist, setArtist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);
  const [errorMessage, setErrorMessage] = useState(``);

  const { artistId } = useParams(); // get any params passed to this component from the router

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/artist/${artistId}`, {
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
        fetch(`${process.env.REACT_APP_BACKEND}/TicketmasterSearch/${data.name}`, {
          headers: { Authorization: `JWT ${jwtToken}` },
        })
          .then((res) => {
            if (res.status === 401) {
              setIsLoggedIn(false);
            }
            return res.json();
          })
          .then((data) => {
            if (data.error) {
              setErrorMessage(data.message);
            } else {
              setConcerts(data);
            }
            setConcerts(data);
          });
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage('Error loading artist data');
      });
  }, []); //will run only once

  // if the user is not logged in, redirect them to the login route
  if (!isLoggedIn) {
    return <Navigate to="/login?error=protected" />;
  }

  if (errorMessage) {
    return (
      <div className="Artist">
        <header className="Artist-header">
          <img src={logo} alt="logo" />
          {artist.name ? <h1>{artist.name}</h1> : ''}
        </header>

        <p className="artistError">{errorMessage}</p>
      </div>
    );
  } else {
    return (
      <div className="Artist">
        <header className="Artist-header">
          <img src={logo} alt="logo" />
          <h1>{artist.name}</h1>
          <h2>Upcoming Concerts</h2>
        </header>
        <div className="artistConcerts-container">
          {concerts.map((concert) => (
            <div className="saved-concert">
              <ConcertComponent key={concert.id} details={concert} />
              {console.log(concert)}
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Artist;
