import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './SavedConcerts.css';
import ConcertComponent from '../components/ConcertComponent';
import logo from '../img/SVG/logo.svg';

const SavedConcerts = (props) => {
  const jwtToken = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);
  const [savedConcerts, setSavedConcerts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(``);

  const filterConcerts = (concerts, query) => {
    const filtered = concerts.filter(
      (concert) =>
        concert.artist.toLowerCase().includes(query.toLowerCase()) ||
        concert.date.toLowerCase().includes(query.toLowerCase()) ||
        concert.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredConcerts(filtered);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/SavedConcerts`, {
      headers: { Authorization: `JWT ${jwtToken}` },
    })
      .then((res) => {
        if (res.status === 401) {
          return <Navigate to="/login?error=protected" />;
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setErrorMessage(data.message);
        } else {
          setSavedConcerts(data);
          filterConcerts(data, searchQuery);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredConcerts, setFilteredConcerts] = useState(savedConcerts);

  useEffect(() => {
    filterConcerts(savedConcerts, searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // if the user is not logged in, redirect them to the login route
  if (!isLoggedIn) {
    return <Navigate to="/login?error=protected" />;
  }

  if (errorMessage) {
    return (
      <div className="SavedConcerts">
        <header className="savedConcerts-header">
          <img src={logo} alt="logo" />
          <h2>Saved Concerts</h2>
        </header>
        <div className="savedConcerts-container">
          <p className="concertError">{errorMessage}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="SavedConcerts">
        <header className="savedConcerts-header">
          <img src={logo} alt="logo" />
          <h2>Saved Concerts</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search Concerts"
              value={searchQuery}
              onChange={handleInputChange}
              className="search-input"
            />
          </div>
        </header>
        <div className="savedConcerts-container">
          {filteredConcerts.map((concert) => (
            <div key={concert._id} className="saved-concert">
              <ConcertComponent key={concert.ticketmasterID} details={concert} />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default SavedConcerts;
