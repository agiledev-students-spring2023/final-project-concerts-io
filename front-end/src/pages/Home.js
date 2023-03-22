import {useEffect, useState, React}  from 'react';
import {Navigate } from "react-router-dom"
import "./Home.css"
import axios from "axios"
import ConcertComponent from "../components/ConcertComponent"
import logo from "../img/SVG/logo.svg"


const Home = (props) => {
    const [recommendedConcerts, setRecommendedConcerts] = useState([])  

    useEffect(() => {
    axios("https://my.api.mockaroo.com/concerts.json?key=54687d90")
     .then(response => {
      setRecommendedConcerts(response.data)
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
          image: 'https://dummyimage.com/250x100',
          link: 'http://localhost:3000/concerts/1',
        },
        {
          id: 2,
          name: 'Example Concert',
          artist: 'Example Artist',
          date: 'Example Date',
          location: 'Example Venue',
          image: 'https://dummyimage.com/250x100',
          link: 'http://localhost:3000/concerts/2',
        },
        {
          id: 3,
          name: 'Example Concert',
          artist: 'Example Artist',
          date: 'Example Date',
          location: 'Example Venue',
          image: 'https://dummyimage.com/250x100',
          link: 'http://localhost:3000/concerts/3',
        },
    ];
      setRecommendedConcerts(backupData)
     })
 }, []) 
    // if the user is not logged in, redirect them to the login route
    if (!props.user || !props.user.success) {
        return <Navigate to="/login?error=protected" />
      }
    return(
        <div className="Home">
            <div className="home-header">
                <img src={logo} alt="logo"/>
                <h1>Recommended Concerts</h1>
            </div>
            <div className="concerts-container">
                <div className="recommendedConcerts-container">
                {recommendedConcerts.map(concert => (
                    <div key={concert.id} className="recommended-concert">
                    <ConcertComponent key = {concert.id} details = {concert} />
                    </div>
                ))}
                </div>
            </div>
        </div>
        
    )
};

export default Home