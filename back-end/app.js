const express = require('express');

const path = require('path');

const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
require('dotenv').config({ silent: true });
const morgan = require('morgan');
const helpers = require('./helperFunctions');
const ConcertRouter = require('./routes/Concert');
const TicketMasterRouter = require('./controllers/TicketMaster');
const TicketMasterManyRouter = require('./controllers/TicketMasterMany');

const ArtistRouter = require('./routes/Artist');

const app = express();

const SavedConcertsRoute = require('./routes/SavedConcerts');
const FavoriteArtistsRoute = require('./routes/FavoriteArtists');
const SpotifyConnectRouter = require('./routes/SpotifyConnnect');
const SpotifyCallbackRouter = require('./routes/SpotifyCallback');
const EditProfileRouter = require('./routes/EditProfile');

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
app.use('/ticketmaster', TicketMasterRouter);
app.use('/ticketmastermany', TicketMasterManyRouter);

app.use('/SavedConcerts', SavedConcertsRoute);
app.use('/FavoriteArtists', FavoriteArtistsRoute);
app.use('/spotifyconnect', SpotifyConnectRouter);
app.use('/spotifycallback', SpotifyCallbackRouter);
app.use('/edit-profile', EditProfileRouter);

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

app.use('/concert', ConcertRouter);
app.use('/artist', ArtistRouter);

module.exports = app;
