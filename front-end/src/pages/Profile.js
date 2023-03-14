import React from "react"
import { Link, Navigate } from "react-router-dom"
import "./Profile.css"
import User from "../components/User"
import FavArtistsMini from "../components/FavArtistsMini"
import SavedConcertsMini from "../components/SavedConcertsMini"
const Profile = props => {
  // if the user is not logged in, redirect them to the login route
  if (!props.user || !props.user.success) {
    return <Navigate to="/login?error=protected" />
  }
  let logInOutComponent;
  if (props.user.success){
    logInOutComponent = (
      <>
        <Link to="/logout">Logout {props.user.username}</Link>
      </>
    )
  }
    return (
      <div className="Profile">
      <User/>
      <FavArtistsMini/>
      <SavedConcertsMini/>
      {logInOutComponent}
      </div>
      
    )
  }
  
  export default Profile