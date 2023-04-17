const express = require('express');

const ConnectionRouter = express.Router();

const passport = require('passport');

ConnectionRouter.get('/', passport.authenticate('jwt', { session: false }), async (req, res,next) => {
    console.log(req.user)
    res.send("hello")
});

module.exports = ConnectionRouter;
