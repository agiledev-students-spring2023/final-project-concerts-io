import { React, useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import ConcertComponent from '../components/ConcertComponent';
import './Recommended.css';

const Recommended = (props) => {
  const jwtToken = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);
  const [recommendedConcerts, setRecommendedConcerts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/ticketmastermany/', {
          headers: { Authorization: `JWT ${jwtToken}` },
        });
        if (response.status === 401) {
          return <Navigate to="/login?error=protected" />;
        }
        const data = await response.json();
        console.log(data);
        setRecommendedConcerts(data);
      } catch (err) {
        // throw an error
        console.error(err);
      }
    }
    fetchData();
  }, []);

  // if the user is not logged in, redirect them to the login route

  if (!isLoggedIn) {
    return <Navigate to="/login?error=protected" />;
  }

  return (
    <div className="Recommended">
      <div className="Recommended-header">
        <h1>Concerts.io</h1>
        <h2>Recommended Concerts</h2>
      </div>
      <div className="concerts-container">
        <div className="recommendedConcerts-container">
          {recommendedConcerts.map((concert) => (
            <div key={concert.ticketmasterID} className="recommended-concert">
              <ConcertComponent key={concert.ticketmasterID} details={concert} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommended;
