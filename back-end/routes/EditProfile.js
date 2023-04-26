const express = require('express');
const passport = require('passport');

const EditProfileRouter = express.Router();

EditProfileRouter.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { username } = req.body;
  const { email } = req.body;
  const { location } = req.body;

  if (!username || !email) {
    // no username or password received in the POST body... send an error
    res
      .status(406)
      .json({ success: false, message: `Error: No username or email supplied.`, error: 'Error' });
  } else {
    try {
      req.user.username = req.body.username;
      req.user.email = req.body.email;
      req.user.location = req.body.location;
      if (req.body.password.length > 1) {
        req.user.password = req.body.password;
      }
      await req.user.save();
      res.status(200).send();
    } catch (err) {
      // throw an error
      console.error(err);
      res.status(500).json({
        success: false,
        message: `Error saving profile details.`,
        error: err,
      });
    }
  }
});

module.exports = EditProfileRouter;
