import { useEffect, useState, React } from 'react';
import { Navigate, Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import ConcertComponent from '../components/ConcertComponent';
import logo from '../img/SVG/logo.svg';

const Home = (props) => {
  const jwtToken = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);
  const [recommendedConcerts, setRecommendedConcerts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(``);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/Recommended`, {
          headers: { Authorization: `JWT ${jwtToken}` },
        });
        if (response.status === 401) {
          setIsLoggedIn(false);
        } else if (response.status === 500) {
          const data = await response.json();
          setErrorMessage(data.message);
          setLoading(false);
        } else {
          const data = await response.json();
          setRecommendedConcerts(data);
          setLoading(false);
        }
      } catch (err) {
        // throw an error
        console.error(err);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleClick = async () => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/Recommended/update`, {
          headers: { Authorization: `JWT ${jwtToken}` },
        });
        if (response.status === 401) {
          setIsLoggedIn(false);
        } else if (response.status === 500) {
          const data = await response.json();
          setErrorMessage(data.message);
          setLoading(false);
        } else {
          const data = await response.json();
          setRecommendedConcerts(data);
          setLoading(false);
        }
      } catch (err) {
        // throw an error
        console.error(err);
        setLoading(false);
      }
    }
    fetchData();
    window.location.reload();
  };

  // if the user is not logged in, redirect them to the login route

  if (!isLoggedIn) {
    return <Navigate to="/login?error=protected" />;
  }

  if (errorMessage) {
    return (
      <div className="Home">
        <div className="home-header">
          <img src={logo} alt="logo" />
          <Link className={'link-styles'} to="/recommended">
            <h1>Recommended Concerts</h1>
          </Link>
        </div>
        <div className="concerts-container">
          <div className="recommendedConcerts-container">
            <p className="error">{errorMessage}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Home">
        <div className="home-header">
          <img src={logo} alt="logo" />
          <Link to="/recommended">
            <h2>Recommended Concerts</h2>
          </Link>
          <button onClick={handleClick} className="update-button">
            Update
          </button>
          {loading && <p>waiting for recommendations!</p>}
        </div>

        <div className="recommendedConcerts-container">
          {recommendedConcerts.map((concert) => (
            <div key={concert.id} className="recommended-concert">
              <ConcertComponent key={concert.id} details={concert} />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Home;
