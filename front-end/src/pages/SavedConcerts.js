import React, {useState,useEffect} from "react"
import { Link, Navigate} from "react-router-dom"
import "./SavedConcerts.css"
import ConcertComponent from "../components/ConcertComponent"
import axios from "axios";

const SavedConcerts = (props) => {
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
        }
       ]
       setSavedConcerts(backupData)
     })
    }, []) 

  // if the user is not logged in, redirect them to the login route
  if (!props.user || !props.user.success) {
    return <Navigate to="/login?error=protected" />
  }

  return (
    <div className="SavedConcerts">
      <header className="header">
        <h1 className="savedConcerts-header">Concerts.io</h1>
        <h2>Saved Concerts</h2>
      </header>
      <div className="concerts-container">
        <div className="savedConcerts-container">
          {savedConcerts.map(concert => (
              <div key={concert.id} className="saved-concert">
                <ConcertComponent key = {concert.id} details = {concert} />
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default SavedConcerts;
