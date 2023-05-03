const express = require('express');

const ConnectionRouter = express.Router();

const passport = require('passport');

ConnectionRouter.get('/',  passport.authenticate('jwt', { session: false }), async (req, res,next) => {
    const profileInfo = {
        email: req.user.email,
        username: req.user.username,
        id: req.user._id
      };
    res.send(profileInfo)

});

module.exports = ConnectionRouter;
