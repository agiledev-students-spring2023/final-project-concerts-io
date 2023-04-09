const express = require('express');

const LoginRouter = express.Router();

const axios = require('axios');

LoginRouter.post('/', async (req, res) => {
  console.log(req.body);
  try {
    // send the request to the server api to authenticate
    const response = await axios('https://my.api.mockaroo.com/users.json', {
      headers: { 'X-API-Key': '7da41420', Accept: 'application/json' },
    });
    // store the response data into the data state variable
    const { data } = response; // data returned will not be the original login info provided by user
    console.log(data);
    res.json(data);
  } catch (err) {
    // throw an error
    console.error(err);
    const backupUser = {
      username: 'backupUser',
      password: 'backupPass',
      success: 1,
    };
    res.json(backupUser);
  }
});

module.exports = LoginRouter;
