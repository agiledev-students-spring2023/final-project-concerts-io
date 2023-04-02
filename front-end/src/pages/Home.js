import { useEffect, useState, React } from 'react';
import { Navigate, Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import ConcertComponent from '../components/ConcertComponent';
import logo from '../img/SVG/logo.svg';

const Home = (props) => {
  const [recommendedConcerts, setRecommendedConcerts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/recommended');
        const data = await response.json();
        console.log(data);
        setRecommendedConcerts(data);
      } catch (err) {
        // throw an error
        console.error(err);
      }
    }
    fetchData();
  }, []);

  // if the user is not logged in, redirect them to the login route
  if (!props.user || !props.user.success) {
    return <Navigate to="/login?error=protected" />;
  }
  return (
    <div className="Home">
      <div className="home-header">
        <img src={logo} alt="logo" />
        <Link to="/recommended">
          <h1>Recommended Concerts</h1>
        </Link>
      </div>
      <div className="concerts-container">
        <div className="recommendedConcerts-container">
          {recommendedConcerts.map((concert) => (
            <div key={concert.id} className="recommended-concert">
              <ConcertComponent key={concert.id} details={concert} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
