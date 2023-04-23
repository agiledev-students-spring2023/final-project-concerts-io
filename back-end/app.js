require('./db');
const express = require('express');

const path = require('path');

const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config({ silent: true });
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtStrategy = require('./config/jwt-config.js');
// import setup options for using JWT in passport
passport.use(jwtStrategy);
const helpers = require('./spotifyHelperFunctions');
const ConcertRouter = require('./routes/Concert');
const TicketMasterRouter = require('./routes/TicketMaster');
const TicketMasterManyRouter = require('./routes/TicketMasterMany');

const ArtistRouter = require('./routes/Artist');

const app = express();

const SavedConcertsRoute = require('./routes/SavedConcerts');
const FavoriteArtistsRoute = require('./routes/FavoriteArtists');
const SpotifyConnectRouter = require('./routes/SpotifyConnnect');
const SpotifyCallbackRouter = require('./routes/SpotifyCallback');
const ProfileRouter = require('./routes/Profile');
const EditProfileRouter = require('./routes/EditProfile');
const RecommendedRouter = require('./routes/Recommended');
const TicketmasterSearchRouter = require('./routes/TicketmasterSearch');
const LastFmConnectRouter = require('./routes/LastFmConnect');
const LastFmCallbackRouter = require('./routes/LastFmCallback');
const SaveConcertRouter = require('./routes/SaveConcert');
const ConnectionRoute = require('./routes/ConnectionPage');
const AuthenticationRouter = require('./routes/Authentication');

// models
const User = require('./models/User');
const Artist = require('./models/Artist');
const Concert = require('./models/Concert');

// Middleware
app.use(passport.initialize());
app.use(cors());
// use the morgan middleware to log all incoming http requests
app.use(morgan('dev')); //

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

// make 'public' directory publicly readable with static content
app.use('/static', express.static('public'));

app.use('/ticketmaster', TicketMasterRouter);
app.use('/ticketmastermany', TicketMasterManyRouter);
app.use('/Recommended', RecommendedRouter);
app.use('/SavedConcerts', SavedConcertsRoute);
app.use('/SaveConcert', SaveConcertRouter);
app.use('/connection', ConnectionRoute);
app.use('/FavoriteArtists', FavoriteArtistsRoute);
app.use('/spotifyconnect', SpotifyConnectRouter);
app.use('/spotifycallback', SpotifyCallbackRouter);
app.use('/spotifymiddleroute', SpotifyCallbackRouter);

app.use('/ticketmastersearch', TicketmasterSearchRouter);
app.use('/profile', ProfileRouter);
app.use('/edit-profile', EditProfileRouter);
app.use('/concert', ConcertRouter);
app.use('/artist', ArtistRouter);
app.use('/recommended', RecommendedRouter);
app.use('/lastfmconnect', LastFmConnectRouter);
app.use('/lastfmcallback', LastFmCallbackRouter);
app.use('/auth', AuthenticationRouter());

module.exports = app;
