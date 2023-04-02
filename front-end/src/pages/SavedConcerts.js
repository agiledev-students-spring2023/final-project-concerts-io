import React, { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import "./SavedConcerts.css"
import ConcertComponent from "../components/ConcertComponent"

const SavedConcerts = (props) => {
  const [savedConcerts, setSavedConcerts] = useState([]);
   const filterConcerts = (concerts, query) => {
    const filtered = concerts.filter((concert) =>
      concert.artist.toLowerCase().includes(query.toLowerCase()) ||
      concert.date.toLowerCase().includes(query.toLowerCase()) ||
      concert.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredConcerts(filtered);
  };
 
 
  useEffect(() => {
    fetch("http://localhost:3000/SavedConcerts")
      .then((res) => res.json())
      .then((data) => {
        setSavedConcerts(data.SavedConcerts);
        filterConcerts(data.SavedConcerts, searchQuery);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
 
 
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredConcerts, setFilteredConcerts] = useState(savedConcerts);
 
 
  useEffect(() => {
    filterConcerts(savedConcerts, searchQuery);
  }, [searchQuery]);
 
 
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
 
 
  // if the user is not logged in, redirect them to the login route
  if (!props.user || !props.user.success) {
    return <Navigate to="/login?error=protected" />;
  }
 
 
  return (
    <div className="SavedConcerts">
      <header className="header">
        <h1 className="savedConcerts-header">Concerts.io</h1>
        <h2>Saved Concerts</h2>
        <div className="search-container">
         <input
           type="text"
           placeholder="Search concerts"
           value={searchQuery}
           onChange={handleInputChange}
           className="search-input"
         />
       </div>
      </header>
      <div className="savedConcerts-container">
        {filteredConcerts.map(concert => (
            <div key={concert.id} className="saved-concert">
              <ConcertComponent key = {concert.id} details = {concert} />
            </div>
        ))}
      </div>
    </div>
  );
};


export default SavedConcerts;