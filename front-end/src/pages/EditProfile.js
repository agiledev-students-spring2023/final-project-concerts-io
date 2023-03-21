import React, { useState, useEffect } from "react"
import { Navigate} from "react-router-dom"
import "./EditProfile.css"

const EditProfile = (props) => {
    const [submit, setSubmit] = useState({})

    useEffect(() => {
        // if profile is edited, then update the user object
        if (submit.success) {
          props.setuser(submit)
        }
      }, [submit])


    const handleSubmit = e => {
        // prevent the HTML form from actually submitting
        e.preventDefault()
            try {
                const formData = {
                    email: e.target.email.value, 
                    username: e.target.username.value,
                    password: e.target.password.value, 
                } //get form data
                
                const editedUser = {
                    email: formData.email,
                    username: formData.username,
                    password: formData.password,
                    success: 1
                }
    
                setSubmit(editedUser)      
              } catch (err) {
                // throw an error
                throw new Error(err)
              }
        
      }
    // if the user is not logged in, redirect them to the login route
    if (!props.user || !props.user.success) {
        return <Navigate to="/login?error=protected" />
    }
    
      // if the user is not logged in, show the login form
      if (!submit.success)
        return (
          <div className="EditProfile">
            <h1>Edit Your Profile</h1>
            <section className="edit-profile">
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
                <input type="submit" value="Edit" />
              </form>
            </section>
          </div>
        )
      // return to profile after editing
      else return <Navigate to="/profile" />
}

export default EditProfile
