import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./ConcertComponent.css"

const ConcertComponent = props => {
    return (
      <div className="ConcertComponent">
        <h2>{props.details.artist}</h2>
        <h3>{props.details.date}</h3>
        <Link to={`/concerts/${props.details.id}`}>Link to concert</Link>
      </div>
    )
  }
  
  export default ConcertComponent