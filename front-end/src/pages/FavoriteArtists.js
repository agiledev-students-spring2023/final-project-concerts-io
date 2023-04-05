import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./FavoriteArtists.css";
import ArtistComponent from "../components/ArtistComponent";

const FavoriteArtists = (props) => {
  const [favArtists, setFavArtists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArtists, setFilteredArtists] = useState([]);

  const filterArtists = (artists, query) => {
    const filtered = artists.filter((artist) =>
      artist.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArtists(filtered);
  };

  useEffect(() => {
    fetch("http://localhost:3000/FavoriteArtists")
      .then((res) => res.json())
      .then((data) => {
        setFavArtists(data);
        filterArtists(data, searchQuery);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchQuery]);
  
  useEffect(() => {
    filterArtists(favArtists, searchQuery);
  }, [searchQuery, favArtists]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // if the user is not logged in, redirect them to the login route
  if (!props.user || !props.user.success) {
    return <Navigate to="/login?error=protected" />;
  }

  return (
    <div className="FavoriteArtists">
      <h1>Your Favorite Artists</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search concerts"
          value={searchQuery}
          onChange={handleInputChange}
          className="search-input"
        />
      </div>
      <section>
        {filteredArtists.map((x) => (
          <ArtistComponent key={x.id} details={x} />
        ))}
      </section>
    </div>
  );
};

export default FavoriteArtists;