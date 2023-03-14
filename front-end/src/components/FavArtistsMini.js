import React,  { useState, useEffect } from "react";
import ArtistComponent from "./ArtistComponent";
import { Link } from "react-router-dom";
const demoUser = {
    proPic: "default",
    username: "averageConcertEnjoyer",
    email: "averageConcertEnjoyer@gmail.com"
}

const exampleArtists = [
    {
      id: 1,
      name: "John Smith",
    },
    {
      id: 2,
      name: "Barry Ken",
    }]

const FavArtistsMini = () =>{

    const [favArtists, setFavArtists] = useState([])
    useEffect(() => {
        setFavArtists(exampleArtists)
    }, []) 


    return(
        <div className="favorite-artists">
           <div className="FavoriteArtists">
           <Link to="/favorite-concerts"> <h3>{demoUser.username}'s' Favorite Artists</h3></Link>
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