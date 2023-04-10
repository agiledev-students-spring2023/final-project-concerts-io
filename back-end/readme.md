# Concerts.io backend

This is an express-based backend for the concerts.io application. It currently provides the react front-end with concert and artist data sourced from a mockaroo api and the ticketmaster api. It also allows for users to link their spotify or last.fm accounts to acquire music listening data. Once this project reaches the database integration stage, concert data will be sourced from the ticketmaster api and our own database that will store saved concerts and artists for individual users.

## Instructions on how to set up and run the project

In order to run the project, first clone the entire repository, and navigate to the back-end folder.

run <code>npm init </code> to install all dependencies,

in order to test, run <code> npm test </code>

to start the server, run <code> npm start </code>

# API Keys

For the grader, these are the API keys from the dotENV file that is hidden from the Github Repository:

# spotify credentials

CLIENT_ID=66a5a19ad51546bbb52fe89b8503d5da
CLIENT_SECRET=6d039c123f97460e83583bc2a37886d7
REDIRECT_URI=http://localhost:3000/spotifycallback

# mockaroo

USERS_API_KEY=7da41420
CONCERTS_API_KEY=54687d90
ARTISTS_API_KEY=54687d90

# ticketmaster

TICKETMASTER_API_KEY=8TyzvIJo1qYOzAkLo8ytUqpOsj2evcPb
TICKETMASTER_API_SECRET=NC1o6W8Ii5Ba1dqT

# LastFM API

LASTFM_API_KEY=7cf3b2aaefaa38b38a46994deedbbb46
LASTFM_API_SECRET=65432410d2012e7852b0e94e084db143
LASTFM_CALLBACK=http://localhost:3000/lastfmcallback
