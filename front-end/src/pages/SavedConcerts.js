import React, {useState,useEffect} from "react"
import { Link, Navigate} from "react-router-dom"
import "./SavedConcerts.css"
import ConcertComponent from "../components/ConcertComponent"
import axios from "axios";


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
    axios("https://my.api.mockaroo.com/concerts.json?key=54687d90")
      .then(response => {
        setSavedConcerts(response.data);
        filterConcerts(response.data, searchQuery);
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
       filterConcerts(backupData, searchQuery)
     })
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
