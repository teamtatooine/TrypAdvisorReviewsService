const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/trypadvisorReviews');

// check db connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose connection error:'));
db.once('open', function() {
  console.log('Mongoose connected!');
});