# Concerts.io backend

This is an express-based backend for the concerts.io application. It currently provides the react front-end with concert and artist data sourced from a mockaroo api and the ticketmaster api. It also allows for users to link their spotify or last.fm accounts to acquire music listening data. Once this project reaches the database integration stage, concert data will be sourced from the ticketmaster api and our own database that will store saved concerts and artists for individual users.

It requires a multitude of environment variables, including last fm, ticket master and spotify api keys
```
# spotify credentials
CLIENT_ID=__________
CLIENT_SECRET=__________
REDIRECT_URI=__________

# ticketmaster
TICKETMASTER_API_KEY=__________
TICKETMASTER_API_SECRET=__________

# LastFM API
LASTFM_API_KEY=__________
LASTFM_API_SECRET=__________
LASTFM_CALLBACK=http://localhost:3000/lastfmcallback

# MongoDB
MONGODB_CONNECTION=__________

#JWT
JWT_SECRET=__________
JWT_EXP_DAYS=__________

#FRONT-END
FRONT_END_DOMAIN=http://localhost:3001 

```

## Instructions on how to set up and run the project

In order to run the project, first clone the entire repository, and navigate to the back-end folder.

run <code>npm init </code> to install all dependencies,

in order to test, run <code> npm test </code>

to start the server, run <code> npm start </code>
