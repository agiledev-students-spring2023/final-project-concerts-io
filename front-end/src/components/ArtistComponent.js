import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import "./ArtistComponent.css"

const ArtistComponent = props => {
    return (
      <div className="ArtistComponent">
        <h1>{props.details.name}</h1>
        <Link to={`/artists/${props.details.id}`}>Upcoming Concerts</Link>
      </div>
    )
  }
  
  export default ArtistComponent