import React, { useState, useEffect } from 'react';
import { Form, Navigate } from 'react-router-dom';
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
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/profile`, {
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
      const formData = new FormData(e.target);
      // send the request to the backend
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/edit-profile`, {
        method: 'POST',
        headers: {
          Authorization: `JWT ${jwtToken}`,
        },
        body: formData,
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
            <label htmlFor="location">Choose a location:</label>
            <select id="location" name="location">
              {user.location == 'NY' ? (
                <option value="NY" selected>
                  New York
                </option>
              ) : (
                <option value="NY">New York</option>
              )}
              {user.location == 'CA' ? (
                <option value="CA" selected>
                  California
                </option>
              ) : (
                <option value="Los Angeles">Los Angeles</option>
              )}
              {user.location == 'IL' ? (
                <option value="IL" selected>
                  Illinois
                </option>
              ) : (
                <option value="IL">Illinois</option>
              )}
              {user.location == 'TX' ? (
                <option value="TX" selected>
                  Texas
                </option>
              ) : (
                <option value="TX">Texas</option>
              )}
            </select>
            <br />
            <br />
            <label>Upload a profile picture:</label>
            <input type="file" id="profilePic" name="profilePic" accept="image/*" />
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
