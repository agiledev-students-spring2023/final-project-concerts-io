import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./FavoriteArtists.css"
import ArtistComponent from "../components/ArtistComponent"

const exampleArtists = [
  {
    id: 1,
    name: "John Smith",
  },
  {
    id: 2,
    name: "Barry Ken",
  }]

const FavoriteArtists = props => {
  const [favArtists, setFavArtists] = useState([])

  useEffect(() => {
    //fetch to mock backend and return data when component first loads
    setFavArtists(exampleArtists)
  }, []) //will run only once

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