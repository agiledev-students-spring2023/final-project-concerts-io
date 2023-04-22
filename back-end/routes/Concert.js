const express = require('express');

const ConcertRouter = express.Router();

const axios = require('axios');

const passport = require('passport');

ConcertRouter.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    // eslint-disable-next-line no-console
    console.log(req.params);
    const response = await axios.get(
      `https://my.api.mockaroo.com/concerts/${req.params.id}.json?key=54687d90`
    );
    res.json(response.data); // pass data along directly to client
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Error finding concert data.',
      error: err,
    });
  }
});

module.exports = ConcertRouter;
