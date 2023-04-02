import React, { useState, useEffect } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import "./Register.css"

const Register = (props) => {
    // create state variables to hold username and password
    const [status, setStatus] = useState({}) // the API will return an object indicating the login status in a success field of the response object
  
    // if the user's logged-in status changes, call the setuser function that was passed to this component from the PrimaryNav component.
    useEffect(() => {
      // if the login was a success, call the setuser function that was passed to this component as a prop
      if (status.success) {
        console.log(`User successfully logged in: ${status.username}`)
        props.setuser(status)
      }
    }, [status])
  
    const handleSubmit = async e => {
      // prevent the HTML form from actually submitting
      e.preventDefault()
  
      try {
        // send the request to the server api to authenticate
        const response = await fetch("https://my.api.mockaroo.com/users.json" , {
          headers: {"X-API-Key": "7da41420", Accept: "application/json"}
          })
        // store the response data into the data state variable
        const data = await response.json() //data returned will not be the original login info provided by user
        console.log(data) 
        setStatus(data)
      } catch (err) {
        // throw an error
        throw new Error(err)
      }
    }
  
    // if the user is not logged in, show the login form
    if (!status.success)
      return (
        <div className="Login">
          <h1>Register</h1>
          <section className="login">
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
      )
    // otherwise, if the user has successfully registered, redirect them to the home page
    else return <Navigate to="/" />
}

export default Register