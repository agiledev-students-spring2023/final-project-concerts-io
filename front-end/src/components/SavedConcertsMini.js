import React,  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SavedConcertsMini.css';

const SavedConcertsMini = (props) => {
  const jwtToken = localStorage.getItem('token');
  const [savedConcerts, setSavedConcerts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/SavedConcerts', {
      headers: { Authorization: `JWT ${jwtToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setSavedConcerts(data);
      })
      .catch((error) => {
        console.log(error);
      });
}, []);
    return(
      <div>
        <Link to="/saved-concerts"><h2>{props.details.username}'s' Saved Concerts</h2></Link>
        <div id="concerts-container">
            <div id="saved-Concerts-mini-containerr">
              {savedConcerts.map(concert => (
                <div key={concert._id} className="mini-concert">
                <Link to="/concerts/:1">{concert.name}</Link>
                </div>
              ))}
            </div>
          
          </div>
        </div>
    );
}

export default SavedConcertsMini;