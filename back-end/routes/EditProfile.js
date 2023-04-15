const express = require('express');
const passport = require('passport');

const EditProfileRouter = express.Router();

EditProfileRouter.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  console.log(req.body);
  try {
    res.json(req.body);
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
});

module.exports = EditProfileRouter;
