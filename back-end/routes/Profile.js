const express = require('express');
const passport = require('passport');

const ProfileRouter = express.Router();

ProfileRouter.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const profileInfo = {
    email: req.user.email,
    username: req.user.username,
    access_token: req.query.access_token || null,
    refresh_token: req.query.refresh_token || null
  };
  try {
    res.json(profileInfo);
  } catch (err) {
    // throw an error
    console.error(err);
    const backupUser = {
      email: 'backupEmail',
      username: 'backupUser',
    };
    res.json(backupUser);
  }
});

module.exports = ProfileRouter;
