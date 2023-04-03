const express = require('express');

const path = require('path');

const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
require('dotenv').config({ silent: true });
const morgan = require('morgan');
const helpers = require('./helperFunctions');
const ConcertRouter = require('./routes/Concert')
const ArtistRouter = require('./routes/Artist')

const app = express();

const SavedConcertsRoute = require('./routes/SavedConcerts');
const FavoriteArtistsRoute = require('./routes/FavoriteArtists');

// Middleware

app.use(cors());
// use the morgan middleware to log all incoming http requests
app.use(morgan('dev')); //

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

// make 'public' directory publicly readable with static content
app.use('/static', express.static('public'));

app.use(cors());

app.use('/SavedConcerts', SavedConcertsRoute);
app.use('/FavoriteArtists', FavoriteArtistsRoute);

// Routes

// route for connecting spotify account
app.get('/spotifyconnect', (req, res) => {
  const state = helpers.generateRandomString(16);

  // requests authorization
  const scope =
    'user-top-read user-library-read user-read-private user-read-email user-top-read playlist-modify-private playlist-modify-public';
  res.redirect(
    `https://accounts.spotify.com/authorize?${new URLSearchParams({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope,
      redirect_uri: process.env.REDIRECT_URI,
      state,
    }).toString()}`
  );
});

// route user is redirected to after authoring spotify account
app.get('/spotifycallback', async (req, res) => {
  // application requests refresh and access tokens
  // after checking the state parameter
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect(
      `/#${new URLSearchParams({
        error: 'state_mismatch',
      }).toString()}`
    );
  } else {
    const data = await helpers.getToken(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      code,
      process.env.REDIRECT_URI
    );
    const { access_token } = data;
    const { refresh_token } = data;

    // get favorite artists
    const response = await helpers.useAccessToken(
      'https://api.spotify.com/v1/me/top/artists',
      access_token
    );
    const favArtists = response.items;
    console.log(favArtists);
    res.redirect('http://localhost:3001/profile');
  }
});

app.get('/login', async (req, res) => {
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

app.get('/recommended', async (req, res) => {
  axios('https://my.api.mockaroo.com/concerts.json?key=54687d90')
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.error(err);
      const backupData = [
        {
          id: 1,
          name: 'Example Concert',
          artist: 'Example Artist',
          date: 'Example Date',
          location: 'Example Venue',
          image: 'https://dummyimage.com/250x100',
          link: 'http://localhost:3000/concerts/1',
        },
        {
          id: 2,
          name: 'Example Concert',
          artist: 'Example Artist',
          date: 'Example Date',
          location: 'Example Venue',
          image: 'https://dummyimage.com/250x100',
          link: 'http://localhost:3000/concerts/2',
        },
        {
          id: 3,
          name: 'Example Concert',
          artist: 'Example Artist',
          date: 'Example Date',
          location: 'Example Venue',
          image: 'https://dummyimage.com/250x100',
          link: 'http://localhost:3000/concerts/3',
        },
      ];
      res.json(backupData);
    });
});

app.use("/concert",ConcertRouter)
app.use("/artist",ArtistRouter)



module.exports = app;
