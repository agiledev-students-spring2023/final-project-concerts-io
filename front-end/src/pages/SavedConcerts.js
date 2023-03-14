import React from "react"
import { Link, Navigate} from "react-router-dom"
import "./SavedConcerts.css"

const SavedConcerts = props => {
    // if the user is not logged in, redirect them to the login route
    if (!props.user || !props.user.success) {
      return <Navigate to="/login?error=protected" />
    }
    return (
      <div className="SavedConcerts">
      </div>
    )
  }
  
  export default SavedConcerts