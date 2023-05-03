import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SavedConcertsMini.css';

const SavedConcertsMini = (props) => {
  const jwtToken = localStorage.getItem('token');
  const [savedConcerts, setSavedConcerts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(``);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/SavedConcerts`, {
      headers: { Authorization: `JWT ${jwtToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setErrorMessage(data.message);
        } else {
          setSavedConcerts(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (errorMessage) {
    return (
      <div>
        <Link to="/saved-concerts">
          <h2>{props.details.username}'s' Saved Concerts</h2>
        </Link>
        <div id="concerts-container">
          <div id="saved-Concerts-mini-containerr">
            <p className="error">{errorMessage}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="savedConcertsMini">
        <Link to="/saved-concerts" className="savedConcerts">
          <h3>Saved Concerts</h3>
        </Link>
        <div className="saved-Concerts-mini-container">
          {savedConcerts.map((concert) => (
            <div key={concert.ticketmasterID} className="mini-concert">
              <Link to={`/concerts/${concert.ticketmasterID}`}>{concert.name}</Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default SavedConcertsMini;
