import React, { useState, useEffect } from 'react';
import { Navigate, useSearchParams, Link } from 'react-router-dom';
import './Login.css';

const Login = (props) => {
  let [urlSearchParams] = useSearchParams(); // get access to the URL query string parameters

  // create state variables to hold username and password
  const [status, setStatus] = useState({}); // the API will return an object indicating the login status in a success field of the response object
  const [errorMessage, setErrorMessage] = useState(``); // will contain any error message that explains why the user was redirected to this page.

  // if the user got here by trying to access our Protected page, there will be a query string parameter called 'error' with the value 'protected'
  useEffect(() => {
    const qsError = urlSearchParams.get('error'); // get any 'error' field in the URL query string
    if (qsError === 'protected') setErrorMessage('Please log in to access our website.');
  }, []);

  // if the user's logged-in status changes, call the setuser function that was passed to this component from the Menu component.
  useEffect(() => {
    // if the login was a success, call the setuser function that was passed to this component as a prop
    if (status.success && status.token) {
      console.log(`User successfully logged in: ${status.username}`);
      localStorage.setItem('token', status.token); // store the token into localStorage
    }
  }, [status]);

  const handleSubmit = async (e) => {
    // prevent the HTML form from actually submitting
    e.preventDefault();

    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    try {
      // send the request to the server api to authenticate
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // store the response data into the data state variable
      const data = await response.json(); //data returned will not be the original login info provided by user

      if (!data.success) {
        setErrorMessage(data.message);
      } else {
        setStatus(data);
      }
    } catch (err) {
      // throw an error
      console.error(err);
      setErrorMessage('Invalid username or password ');
    }
  };

  // if the user is not logged in, show the login form
  if (!status.success)
    return (
      <div className="Login">
        <h1>Log in</h1>
        {errorMessage ? <p className="error">{errorMessage}</p> : ''}
        <section className="login">
          <form onSubmit={handleSubmit}>
            <label>Username: </label>
            <input type="text" name="username" placeholder="username" />
            <br />
            <br />
            <label>Password: </label>
            <input type="password" name="password" placeholder="password" />
            <br />
            <br />
            <input type="submit" value="Log In" />
          </form>
        </section>
        <section className="register">
          <br />
          Not yet Registered?
          <br />
          <Link to="/register">Register</Link>
        </section>
      </div>
    );
  // otherwise, if the user has successfully logged-in, redirect them to the home page
  else return <Navigate to="/" />;
};

export default Login;
