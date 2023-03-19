import React,  { useState, useEffect } from "react";
import ArtistComponent from "./ArtistComponent";
import { Link } from "react-router-dom";
import "./FavArtistsMini.css" 

const exampleArtists = [
    {
      id: 1,
      name: "John Smith",
    },
    {
      id: 2,
      name: "Barry Ken",
    }]

const FavArtistsMini = (props) =>{

    const [favArtists, setFavArtists] = useState([])
    useEffect(() => {
        setFavArtists(exampleArtists)
    }, []) 


    return(
        <div className="favorite-artists">
           <div className="FavoriteArtists">
           <Link to="/favorite-artists"> <h2>{props.details.username}'s' Favorite Artists</h2></Link>
            <section>
            {favArtists.map(x => (
                <ArtistComponent key = {x.id} details = {x} />
            ))}
        </section>
      </div>
        </div>
    )
}

export default FavArtistsMini