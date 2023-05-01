import React, { useState, useEffect } from 'react';
import ArtistComponent from './ArtistComponent';
import { Link } from 'react-router-dom';
import './FavArtistsMini.css';
import axios from 'axios';

const FavArtistsMini = (props) => {
  const jwtToken = localStorage.getItem('token');
  const [favArtists, setFavArtists] = useState([]);
  const [errorMessage, setErrorMessage] = useState(``);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/FavoriteArtists`, {
      headers: { Authorization: `JWT ${jwtToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setErrorMessage(data.message);
        } else {
          setFavArtists(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (errorMessage) {
    return (
      <div className="favorite-artists">
        <div className="FavoriteArtists">
          <Link to="/favorite-artists">
            {' '}
            <h3>{props.details.username}'s' Favorite Artists</h3>
          </Link>
          <section>
            <p className="error">{errorMessage}</p>
          </section>
        </div>
      </div>
    );
  } else {
    return (
      <div className="favArtistsMini">
        <Link to="/favorite-artists" className="favArtists">
          <h3>Favorite Artists</h3>
        </Link>
        <div className="favorite-artists-mini-container">
          <section>
            {favArtists.map((x) => (
              <ArtistComponent key={x._id} details={x} />
            ))}
          </section>
        </div>
      </div>
    );
  }
};

export default FavArtistsMini;
