import React, { useState, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import './Register.css';

const Register = (props) => {
  // create state variables to hold username and password
  const [status, setStatus] = useState({}); // the API will return an object indicating the login status in a success field of the response object
  const [errorMessage, setErrorMessage] = useState(``);

  // if the user's logged-in status changes, call the setuser function that was passed to this component from the PrimaryNav component.
  useEffect(() => {
    // if the login was a success, call the setuser function that was passed to this component as a prop
    if (status.success) {
      console.log(`User successfully logged in: ${status.username}`);
      localStorage.setItem('token', status.token); // store the token into localStorage
    }
  }, [status]);

  const handleSubmit = async (e) => {
    // prevent the HTML form from actually submitting
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
    };

    try {
      // send the request to the server api to authenticate
      const response = await fetch('http://localhost:3000/auth/register', {
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
    }
  };

  // if the user is not logged in, show the register form
  if (!status.success)
    return (
      <div className="Login">
        <h1>Register</h1>
        {errorMessage ? <p className="error">{errorMessage}</p> : ''}
        <section className="register">
          <form onSubmit={handleSubmit}>
            <label>Email: </label>
            <input type="text" name="email" placeholder="email" />
            <br />
            <br />
            <label>Username: </label>
            <input type="text" name="username" placeholder="username" />
            <br />
            <br />
            <label>Password: </label>
            <input type="password" name="password" placeholder="password" />
            <br />
            <br />
            <input type="submit" value="Register" />
          </form>
        </section>
      </div>
    );
  // otherwise, if the user has successfully registered, redirect them to connection page
  else return <Navigate to="/connection" />;
};

export default Register;
