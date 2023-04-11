const mongoose = require('mongoose');
require('dotenv').config({ silent: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Connected successfully');
});

mongoose.connect(process.env.MONGODB_CONNECTION);
