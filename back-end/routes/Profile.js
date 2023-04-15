const express = require('express');
const passport = require('passport');

const ProfileRouter = express.Router();

ProfileRouter.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  console.log(req.user);
  const profileInfo = {
    email: req.user.email,
    username: req.user.username,
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
