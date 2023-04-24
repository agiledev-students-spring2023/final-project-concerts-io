import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './EditProfile.css';

const EditProfile = (props) => {
  const jwtToken = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);
  const [submit, setSubmit] = useState({});
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState(``);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/profile', {
          headers: { Authorization: `JWT ${jwtToken}` },
        });
        if (response.status === 401) {
          return <Navigate to="/login?error=protected" />;
        } else {
          const data = await response.json();
          setUser(data);
        }
      } catch (err) {
        // throw an error
        setErrorMessage('Invalid entries, please try again ');
        console.error(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (submit.success) {
    }
  }, [submit]);

  const handleSubmit = async (e) => {
    // prevent the HTML form from actually submitting
    e.preventDefault();

    try {
      const formData = {
        email: e.target.email.value,
        username: e.target.username.value,
        password: e.target.password.value,
      };
      // send the request to the backend
      const response = await fetch('http://localhost:3000/edit-profile', {
        method: 'POST',
        headers: {
          Authorization: `JWT ${jwtToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 401) {
        setIsLoggedIn(false);
      } else if (response.status === 406) {
        const data = await response.json();
        setErrorMessage(data.message);
      } else {
        setSubmit({ success: 1 });
      }
    } catch (err) {
      // throw an error
      console.error(err);
    }
  };
  // if the user is not logged in, redirect them to the login route
  if (!isLoggedIn) {
    return <Navigate to="/login?error=protected" />;
  }

  // if the user is not logged in, show the login form
  if (!submit.success)
    return (
      <div className="EditProfile">
        <h1>Edit Your Profile</h1>
        {errorMessage ? <p className="error">{errorMessage}</p> : ''}
        <section className="edit-profile">
          <form onSubmit={handleSubmit}>
            <label>Email: </label>
            <input type="text" name="email" defaultValue={user.email} />
            <br />
            <br />
            <label>Username: </label>
            <input type="text" name="username" defaultValue={user.username} />
            <br />
            <br />
            <label>Password: </label>
            <input type="password" name="password" placeholder="password" />
            <br />
            <br />
            <input type="submit" value="Save Changes" />
          </form>
        </section>
      </div>
    );
  // return to profile after editing
  else return <Navigate to="/profile" />;
};

export default EditProfile;
