const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/trypadvisorReviews');

// Check db connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose connection error:'));
db.once('open', function() {
  console.log('Mongoose connected!');
});

// Define mongoose schemas
let Schema = mongoose.Schema;

let attractionSchema = new Schema({
  name: String,
  description: String,
  phone: String,
  email: String,
  website: String,
  suggestedDuration: Number,
  featuredIn: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  lat: Number,
  lng: Number,
  category: String,
  photos: [
    {type: Schema.Types.ObjectId, ref: 'Photo'}
  ],
  reviews: [
    {type: Schema.Types.ObjectId, ref: 'Review'}
  ]
});

let userSchema = new Schema({
  userName: String,
  profilePicture: String,
  memberSince: Date,
  reviews: [
    {type: Schema.Types.ObjectId, ref: 'Review'}
  ],
  photos: [
    {type: Schema.Types.ObjectId, ref: 'Photo'}
  ]
});
