import { React, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './Profile.css';
import User from '../components/User';
import FavArtistsMini from '../components/FavArtistsMini';
import SavedConcertsMini from '../components/SavedConcertsMini';
const Profile = (props) => {
  const jwtToken = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/profile', {
          headers: { Authorization: `JWT ${jwtToken}` },
        });
        if (response.status === 401) {
          return <Navigate to="/login?error=protected" />;
        }
        const data = await response.json();
        console.log(data);
        setUser(data);
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
    <div className="Profile">
      <User details={user} />

      <FavArtistsMini details={user} />
      <SavedConcertsMini details={user} />
    </div>
  );
};

export default Profile;
