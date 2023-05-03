const express = require('express');
const passport = require('passport');

const ProfileRouter = express.Router();

ProfileRouter.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  let picPath;
  if (req.user.profilePic) {
    picPath = `https://stingray-app-f5ntu.ondigitalocean.app/static/uploads/${req.user.profilePic}`;
  }

  const profileInfo = {
    email: req.user.email,
    username: req.user.username,
    location: req.user.location,
    profilePic: picPath,
    access_token: req.query.access_token || null,
    refresh_token: req.query.refresh_token || null,
    success: 1,
  };

  try {
    res.json(profileInfo);
  } catch (err) {
    // throw an error
    console.error(err);
    res.status(500).json({
      success: false,
      message: `Error finding profile data.`,
    });
  }
});

module.exports = ProfileRouter;
