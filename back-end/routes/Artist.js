const express = require('express');

const ArtistRouter = express.Router();

const axios = require('axios');

const passport = require('passport');

ArtistRouter.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    // eslint-disable-next-line no-console
    console.log(req.params);
    const response = await axios.get(
      `https://my.api.mockaroo.com/artists/${req.params.id}.json?key=${process.env.ARTIST_API_KEY}}`
    );
    res.json(response.data);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    const exampleArtist = [
      {
        id: 1,
        name: 'John Smith',
      },
    ];

    res.json(exampleArtist);
  }
});

module.exports = ArtistRouter;
