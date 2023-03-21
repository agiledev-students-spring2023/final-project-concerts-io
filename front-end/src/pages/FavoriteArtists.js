import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./FavoriteArtists.css";
import ArtistComponent from "../components/ArtistComponent";
import axios from "axios";

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
    axios("https://my.api.mockaroo.com/artists.json?key=54687d90")
      .then(response => {
       setFavArtists(response.data)
     })
     .catch(err => {
       console.log(`Get Nae Naed--No Data For you`)
       console.error(err)
       const backupData = [
         {
           id: 1,
           name: "Josh Minksy",
   
         },
         {
           id: 2,
           title: "Mindy Wu",
         }
       ]
       setFavArtists(backupData)
     })
 }, []) 

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
