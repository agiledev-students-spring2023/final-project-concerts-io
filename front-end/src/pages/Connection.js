import { React, useEffect, useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import './Connection.css';

const Connection = (props) => {
  const jwtToken = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);
  let [urlSearchParams] = useSearchParams(); // get access to the URL query string parameters
  const [errorMessage, setErrorMessage] = useState(``); // will contain any error message that explains why the user was redirected to this page.
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/connection`, {
          headers: { Authorization: `JWT ${jwtToken}` },
        });
        if (response.status === 401) {
          return <Navigate to="/login?error=protected" />;
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        // throw an error
        console.error(err);
      }
    }
    fetchData();
    const qsError = urlSearchParams.get('error'); // get any 'error' field in the URL query string
    if (qsError === 'authentication') setErrorMessage('Authentication failed, please try again');
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login?error=protected" />;
  }

  return (
    <div className="Connection">
      <h1>Connect to your music platform</h1>
      {errorMessage ? <p className="error">{errorMessage}</p> : ''}
      <div className="platform">
        <h2>Spotify</h2>
        <a href={`${process.env.REACT_APP_BACKEND}/spotifyconnect/?userid=${user.id}`}>
          {' '}
          Connect Spotify
        </a>
      </div>
      <div className="platform">
        <h2>Last Fm</h2>
        <a href={`${process.env.REACT_APP_BACKEND}/lastfmconnect/?userid=${user.id}`}> Last Fm</a>
      </div>
      <div className="platform">
        <h2>Manual Entry</h2>
        <a href={'/manual-entry'}> Manual Entry</a>
      </div>
    </div>
  );
};

export default Connection;
