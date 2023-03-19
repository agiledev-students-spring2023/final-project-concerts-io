import React,  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './SavedConcertsMini.css'
import ConcertComponent from "./ConcertComponent";
const demoUser = {
    proPic: "default",
    username: "averageConcertEnjoyer",
    email: "averageConcertEnjoyer@gmail.com"
}
const exampleConcerts = [
  {
    id: 1,
    name: "John Smith live at the Purple Lounge",
    artist: "John Smith",
    date: "September 22, 2040",
    description: "John Smith debuts his new record for the first time live",
    location: 'Example Venue',
    image: 'https://example.com/image.jpg',
    ticketLink: 'https://example.com/tickets',
  },
  {
    id: 2,
    name: "Barry Ken live at the Red Lounge",
    artist: "Barry Ken",
    date: "August 15, 2040",
    description: "The legendary Barry Ken returns for his first performace in years",
    location: 'Example Venue',
    image: 'https://example.com/image.jpg',
    ticketLink: 'https://example.com/tickets',
  
},
{
  id: 3,
  name: 'Example Concert',
  artist: 'Example Artist',
  date: 'Example Date',
  location: 'Example Venue',
  description: "Example Description",
  location: 'Example Venue',
  image: 'https://example.com/image.jpg',
  ticketLink: 'https://example.com/tickets'
},
{
  id: 4,
  name: 'Example Concert',
  artist: 'Example Artist',
  date: 'Example Date',
  location: 'Example Venue',
  description: "Example Description",
  location: 'Example Venue',
  image: 'https://example.com/image.jpg',
  ticketLink: 'https://example.com/tickets'
},
{
  id: 5,
  name: 'Example Concert',
  artist: 'Example Artist',
  date: 'Example Date',
  location: 'Example Venue',
  description: "Example Description",
  location: 'Example Venue',
  image: 'https://example.com/image.jpg',
  ticketLink: 'https://example.com/tickets'
},
{
  id: 6,
  name: 'Example Concert',
  artist: 'Example Artist',
  date: 'Example Date',
  location: 'Example Venue',
  description: "Example Description",
  location: 'Example Venue',
  image: 'https://example.com/image.jpg',
  ticketLink: 'https://example.com/tickets'
},
{
  id: 7,
  name: 'Example Concert',
  artist: 'Example Artist',
  date: 'Example Date',
  location: 'Example Venue',
  description: "Example Description",
  location: 'Example Venue',
  image: 'https://example.com/image.jpg',
  ticketLink: 'https://example.com/tickets'
},
]

const SavedConcertsMini = (props) =>{
    return(
      <div>
        <Link to="/saved-concerts"><h3>{props.details.username}'s' Saved Concerts</h3></Link>
        <div id="SavedConcertsMini">
            <div id="mini-concerts-container">
              {exampleConcerts.map(concert => (
                <ConcertComponent key = {concert.id} details = {concert} />
              ))}
            </div>
          
          </div>
        </div>
    );
}

export default SavedConcertsMini