import React,  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './SavedConcertsMini.css'
import ConcertComponent from "./ConcertComponent";
const demoUser = {
    proPic: "default",
    username: "averageConcertEnjoyer",
    email: "averageConcertEnjoyer@gmail.com"
}

const SavedConcertsMini = () =>{
    const savedConcertsInfo = [
    {
      id: 1,
      name: 'Example Concert',
      artist: 'Example Artist',
      date: 'Example Date',
      location: 'Example Venue',
      image: 'https://example.com/image.jpg',
      link: 'http://localhost:3000/concerts/1',
    },
    {
      id: 2,
      name: 'Example Concert',
      artist: 'Example Artist',
      date: 'Example Date',
      location: 'Example Venue',
      image: 'https://example.com/image.jpg',
      link: 'http://localhost:3000/concerts/2',
    },
    {
      id: 3,
      name: 'Example Concert',
      artist: 'Example Artist',
      date: 'Example Date',
      location: 'Example Venue',
      image: 'https://example.com/image.jpg',
      link: 'http://localhost:3000/concerts/3',
    },
    {
      id: 4,
      name: 'Example Concert',
      artist: 'Example Artist',
      date: 'Example Date',
      location: 'Example Venue',
      image: 'https://example.com/image.jpg',
      link: 'http://localhost:3000/concerts/4',
    },
    {
      id: 5,
      name: 'Example Concert',
      artist: 'Example Artist',
      date: 'Example Date',
      location: 'Example Venue',
      image: 'https://example.com/image.jpg',
      link: 'http://localhost:3000/concerts/5',
    },
    {
      id: 6,
      name: 'Example Concert',
      artist: 'Example Artist',
      date: 'Example Date',
      location: 'Example Venue',
      image: 'https://example.com/image.jpg',
      link: 'http://localhost:3000/concerts/6',
    },
    {
      id: 7,
      name: 'Example Concert',
      artist: 'Example Artist',
      date: 'Example Date',
      location: 'Example Venue',
      image: 'https://example.com/image.jpg',
      link: 'http://localhost:3000/concerts/7',
    },
  ];
    return(
        <div id="SavedConcertsMini">
            <Link to="/saved-concerts"><h3>{demoUser.username}'s' Saved Concerts</h3></Link>
            <div id="mini-concerts-container">
              {savedConcertsInfo.map(concert => (
                <ConcertComponent key = {concert.id} details = {concert} />
              ))}
            </div>
          </div>
    );
}

export default SavedConcertsMini