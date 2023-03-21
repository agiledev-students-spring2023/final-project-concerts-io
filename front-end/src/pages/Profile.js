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
  let logOutAndEditComponent;
  if (props.user.success){
    logOutAndEditComponent = (
      <div className="logOut">
        <Link to="/logout">Logout {props.user.username}</Link>
        <br />
        <Link to="/edit-profile">Edit Profile {props.user.username}</Link>
      </div>
    )
  }
    return (
      <div className="Profile">
      <User details={props.user} login={logOutAndEditComponent}/>
      
      <FavArtistsMini details={props.user}/>
      <SavedConcertsMini details={props.user}/>
      </div>
      
    )
  }
  
  export default Profile