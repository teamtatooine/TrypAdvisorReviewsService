require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

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
  mainPhotoUrl: String,
  phone: String,
  email: String,
  website: String,
  suggestedDuration: String,
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

let reviewSchema = new Schema({
  attraction: {type: Schema.Types.ObjectId, ref: 'Attraction'},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  userRating: Number,
  reviewDate: Date,
  title: String,
  description: String,
  upVote: Number,
  visitType: String,
  visitDate: Date,
  recommendedLengthOfVisit: String,
  skipLine: String,
  headCover: String,
  modestDress: String,
  payForWifi: String,
  teenagerFriendly: String,
  artsAssociated: String,
  photos: [
    {type: Schema.Types.ObjectId, ref: 'Photo'}
  ]
});

let userSchema = new Schema({
  userName: String,
  profilePicture: String,
  memberSince: Date,
  location: String,
  reviews: [
    {type: Schema.Types.ObjectId, ref: 'Review'}
  ],
  photos: [
    {type: Schema.Types.ObjectId, ref: 'Photo'}
  ]
});

let photoSchema = new Schema({
  review: {type: Schema.Types.ObjectId, ref: 'Review'},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  caption: String,
  imageUrl: String
});

// Build mongoose models
let Attraction = mongoose.model('Attraction', attractionSchema);
let Review = mongoose.model('Review', reviewSchema);
let User = mongoose.model('User', userSchema);
let Photo = mongoose.model('Photo', photoSchema);

module.exports = {
  Attraction: Attraction,
  Review: Review,
  User: User,
  Photo: Photo
};
