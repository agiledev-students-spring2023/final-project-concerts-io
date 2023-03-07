import React from "react"
import { Link } from "react-router-dom"
import "./Profile.css"
import User from "../components/User"
import FavArtistsMini from "../components/FavArtistsMini"
import SavedConcertsMini from "../components/SavedConcertsMini"
const Profile = props => {
    return (
      <div className="Profile">
      <User/>
      <FavArtistsMini/>
      <SavedConcertsMini/>
      </div>
      
    )
  }
  
  export default Profile