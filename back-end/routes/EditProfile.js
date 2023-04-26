const express = require('express');
const passport = require('passport');
const multer = require('multer');
const path = require('path');

// enable file uploads saved to disk in a directory named 'public/uploads'
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename(req, file, cb) {
    // take apart the uploaded file's name so we can create a new one based on it
    const extension = path.extname(file.originalname);
    const basenameWithoutExtension = path.basename(file.originalname, extension);
    // create a new filename with a timestamp in the middle
    const newName = `${basenameWithoutExtension}-${Date.now()}${extension}`;
    // tell multer to use this new filename for the uploaded file
    cb(null, newName);
  },
});
const upload = multer({ storage });

const EditProfileRouter = express.Router();

EditProfileRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.single('profilePic'),
  async (req, res) => {
    const { username } = req.body;
    const { email } = req.body;
    const { location } = req.body;

    if (!username || !email || !location) {
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
        if (req.file) {
          req.user.profilePic = req.file.filename;
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
  }
);

module.exports = EditProfileRouter;
