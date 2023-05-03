import React, { useState, useEffect } from 'react';
import { Form, Navigate } from 'react-router-dom';
import './ManualEntry.css';

const ManualEntry = () => {
  const jwtToken = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);
  const [submit, setSubmit] = useState({});
  const [artists, setArtists] = useState(Array(20).fill(''));
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState(``);

  const handleArtistChange = (index, event) => {
    const newArtists = [...artists];
    newArtists[index] = event.target.value;
    setArtists(newArtists);
  };

  useEffect(() => {
    if (submit.success) {
    }
  }, [submit]);

  const handleSubmit = async (e) => {
    // prevent the HTML form from actually submitting
    e.preventDefault();
    try {
      // send the request to the backend
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/ManualEntry`, {
        method: 'POST',
        headers: {
          Authorization: `JWT ${jwtToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ artists: artists }),
      });
      if (response.status === 401) {
        setIsLoggedIn(false);
      } else if (response.status === 406) {
        const data = await response.json();
        setErrorMessage(data.message);
      } else {
        setSubmit({ success: 1 });
      }
    } catch (err) {
      // throw an error
      console.error(err);
    }
  };
  // if the user is not logged in, redirect them to the login route
  if (!isLoggedIn) {
    return <Navigate to="/login?error=protected" />;
  }

  // if the user is not logged in, show the login form
  if (!submit.success)
    return (
      <div className="manualEntry">
        <h2>Enter up to 20 favorite artists:</h2>
        {errorMessage ? <p className="error">{errorMessage}</p> : ''}
        <section>
          <form onSubmit={handleSubmit}>
            {artists.map((artist, index) => (
              <div key={index}>
                <label htmlFor={`artist${index + 1}`}>{`Artist ${index + 1}: `}</label>
                <input
                  type="text"
                  id={`artist${index + 1}`}
                  value={artist}
                  onChange={(event) => handleArtistChange(index, event)}
                />
              </div>
            ))}
            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
    );
  // return to profile after editing
  else return <Navigate to="/profile" />;
};

export default ManualEntry;
