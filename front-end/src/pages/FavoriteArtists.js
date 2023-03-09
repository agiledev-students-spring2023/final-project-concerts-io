import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./FavoriteArtists.css"
import ArtistComponent from "../components/ArtistComponent"
import axios from "axios"


const FavoriteArtists = props => {
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
           name: "Josh Minksy",
   
         },
         {
           id: 2,
           title: "Mindy Wu",
         },
       ]
       setFavArtists(backupData)
     })
 }, []) 

    return (
      <div className="FavoriteArtists">
        <h1>Your Favorite Artists</h1>
        <section>
        {favArtists.map(x => (
          <ArtistComponent key = {x.id} details = {x} />
        ))}
        </section>
      </div>
    )
  }
  
  export default FavoriteArtists