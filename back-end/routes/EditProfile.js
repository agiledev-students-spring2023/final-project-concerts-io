const express = require('express');
const passport = require('passport');

const EditProfileRouter = express.Router();

EditProfileRouter.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { username } = req.body;
  const { email } = req.body;

  if (username.length < 1 || email.length < 1) {
    // no username or password received in the POST body... send an error
    res.status(406).json({ success: false, message: `No username or email supplied.` });
  } else {
    console.log(req.body);

    try {
      console.log('test');
      req.user.username = req.body.username;
      req.user.email = req.body.email;
      if (req.body.password.length > 1) {
        req.user.password = req.body.password;
      }
      await req.user.save();
      res.status(200).send();
    } catch (err) {
      // throw an error
      console.error(err);
      const backupUser = {
        email: 'backupEmail',
        username: 'backupUser',
        password: 'backupPass',
        success: 1,
      };
      res.json(backupUser);
    }
  }
});

module.exports = EditProfileRouter;
