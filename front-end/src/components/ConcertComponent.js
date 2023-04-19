import React from 'react';
import { Link } from 'react-router-dom';
import './ConcertComponent.css'

const ConcertComponent = props => {
    return (
      <div className="ConcertComponent">
        <div className="concert">
              <img src={props.details.image} alt={props.details.artist} />
              <div className="concert-details">
                <h3>{props.details.artist}</h3>
                <p>{props.details.date}</p>
                <p>{props.details.location}</p>
                <Link to={`/concerts/${props.details._id}`}>Link</Link>
              </div>
            </div>
      </div>
    )
  }
  
  export default ConcertComponent;