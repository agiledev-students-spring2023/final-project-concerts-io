const express = require('express');

const mongoose = require('mongoose');
const User = require('../models/User.js');

const authenticationRouter = () => {
  const router = express.Router();

  router.post('/register', async (req, res) => {
    const { username } = req.body;
    const { password } = req.body;
    const { email } = req.body;

    if (!username || !password || !email) {
      // no username or password received in the POST body... send an error
      res.status(401).json({
        success: false,
        message: `Error: No username or password or email supplied.`,
      });
    } else {
      // create a new user
      try {
        const user = await new User({ username, password, email }).save();
        // user saved successfully... send a success response
        console.log(`New user: ${user}`);
        const token = user.generateJWT(); // generate a signed token
        res.json({
          success: true,
          message: 'User saved successfully.',
          token,
          username: user.username,
        }); // send the token to the client to store
      } catch (err) {
        // error saving user to database... send an error response
        console.error(`Failed to save user: ${err}`);
        res.status(500).json({
          success: false,
          message: 'Error saving user to database.',
          error: err,
        });
      }
    }
  });

  // a route to handle login attempts requested to /auth/login
  router.post('/login', async (req, res) => {
    const { username } = req.body;
    const { password } = req.body;
    // console.log(`${username}, ${password}`)

    if (!username || !password) {
      // no username or password received in the POST body... send an error
      res.status(401).json({ success: false, message: `No username or password supplied.` });
    } else {
      // find this user in the database
      try {
        const user = await User.findOne({ username }).exec();
        // check if user was found
        if (!user) {
          console.error(`User not found.`);
          return res.status(401).json({
            success: false,
            message: 'Error: User not found in database.',
          });
        }
        // if user exists, check if password is correct
        if (!user.validPassword(password)) {
          console.error(`Incorrect password.`);
          return res.status(401).json({
            success: false,
            message: 'Incorrect password.',
          });
        }
        // user found and password is correct... send a success response
        console.log('User logged in successfully.');
        const token = user.generateJWT(); // generate a signed token
        res.json({
          success: true,
          message: 'User logged in successfully.',
          token,
          username: user.username,
        }); // send the token to the client to store
      } catch (err) {
        // check error
        console.error(`Error looking up user: ${err}`);
        return res.status(500).json({
          success: false,
          message: 'Error looking up user in database.',
          error: err,
        });
      }
    }
  });

  return router;
};

// export the router
module.exports = authenticationRouter;
