import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './EditProfile.css';

const EditProfile = (props) => {
  const [submit, setSubmit] = useState({});

  useEffect(() => {
    // if profile is edited, then update the user object
    if (submit.success) {
      props.setuser(submit);
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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // store the response data into the data state variable
      const data = await response.json(); //data returned will not be the original login info provided by user
      console.log(data);

      const editedUser = {
        email: data.email,
        username: data.username,
        password: data.password,
        success: 1,
      };
      setSubmit(editedUser);
    } catch (err) {
      // throw an error
      console.error(err);
    }
  };
  // if the user is not logged in, redirect them to the login route
  /*
  if (!props.user || !props.user.success) {
    return <Navigate to="/login?error=protected" />;
  }
  */

  // if the user is not logged in, show the login form
  if (!submit.success)
    return (
      <div className="EditProfile">
        <h1>Edit Your Profile</h1>
        <section className="edit-profile">
          <form onSubmit={handleSubmit}>
            <label>Email: </label>
            <input type="text" name="email" defaultValue={props.user.email} />
            <br />
            <br />
            <label>Username: </label>
            <input type="text" name="username" defaultValue={props.user.username} />
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
