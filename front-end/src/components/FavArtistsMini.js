import React,  { useState, useEffect } from "react";
import ArtistComponent from "./ArtistComponent";
import { Link } from "react-router-dom";
import "./FavArtistsMini.css" 
import axios from "axios"

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
                name: "Example Artist 1",
        
              },
              {
                id: 2,
                title: "Example Artist 2",
              },
              {
                id: 3,
                title: "Example Artist 3",
              }
            ]
            setFavArtists(backupData)
          })
      }, []) 
    
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