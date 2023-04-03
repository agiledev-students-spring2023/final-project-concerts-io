import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import "./Artist.css";
import axios from "axios";
import ConcertComponent from "../components/ConcertComponent";



const Artist = (props) => {
  const [concerts, setConcerts] = useState([]);
  const [artist, setArtist] = useState([]);

  const { artistId } = useParams(); // get any params passed to this component from the router

  useEffect(() => {
    fetch("http://localhost:3000/artist/:id")
      .then((res) => res.json()).then((data) => {
        setArtist(data);
        fetch(`http://localhost:3000/concert/${data.id}`).then((res) => res.json()).then((data =>{
          setConcerts(data)
        }));
      })
      .catch((error) => {
        console.log(error);        
      });
    },[]); //will run only once

  // if the user is not logged in, redirect them to the login route
  if (!props.user || !props.user.success) {
    return <Navigate to="/login?error=protected" />;
  }

  return (
    <div className="Artist">
      <h1>{artist.name}</h1>
      <h2>Upcoming Concerts</h2>
      <div className="concerts-container">
        <div className="artistConcerts-container">
          <ConcertComponent key={concerts.id} details={concerts} />
        </div>
      </div>
    </div>
  );
};

export default Artist;
