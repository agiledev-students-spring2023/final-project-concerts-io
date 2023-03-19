import React,  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './SavedConcertsMini.css'
import ConcertComponent from "./ConcertComponent";
import axios from 'axios'

const SavedConcertsMini = (props) =>{
  const [savedConcerts, setSavedConcerts] = useState([])
  useEffect(() => {
    axios("https://my.api.mockaroo.com/concerts.json?key=54687d90")
     .then(response => {
       setSavedConcerts(response.data)
     })
     .catch(err => {
       console.log(`Get Nae Naed--No Data For you`)
       console.error(err)
       const backupData = [
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
       ]
       setSavedConcerts(backupData)
     })
 }, []) 
    return(
      <div>
        <Link to="/saved-concerts"><h3>{props.details.username}'s' Saved Concerts</h3></Link>
        <div id="SavedConcertsMini">
            <div id="mini-concerts-container">
              {savedConcerts.map(concert => (
                <ConcertComponent key = {concert.id} details = {concert} />
              ))}
            </div>
          
          </div>
        </div>
    );
}

export default SavedConcertsMini