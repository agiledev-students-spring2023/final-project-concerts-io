import React,  { useState, useEffect } from "react";
import ArtistComponent from "./ArtistComponent";
import { Link } from "react-router-dom";
import "./FavArtistsMini.css" 
import axios from "axios"


  const FavArtistsMini = (props) =>{
      const jwtToken = localStorage.getItem('token');
      const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);
      const [favArtists, setFavArtists] = useState([]);
  
  
      useEffect(() => {
        fetch('http://localhost:3000/FavoriteArtists', {
          headers: { Authorization: `JWT ${jwtToken}` },
        })
          .then((res) => {
            if (res.status === 401) {
              setIsLoggedIn(false);
            }
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setFavArtists(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
    
        return(
            <div className="favorite-artists">
               <div className="FavoriteArtists">
               <Link to="/favorite-artists"> <h3>{props.details.username}'s' Favorite Artists</h3></Link>
                <section>
                {
                    favArtists.map(x => (
                    <ArtistComponent key = {x.id} details = {x} />
                ))}
                
            </section>
          </div>
            </div>
        )
    }

export default FavArtistsMini