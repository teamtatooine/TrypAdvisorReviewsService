const db = require('./index.js');

// Add new Attraction
const addAttraction = (attractionData, callback) => {
  db.Attraction.create(attractionData, callback);
};

// Add new Review
const addReview = (reviewData, callback) => {
  reviewData.reviewDate = new Date();
  db.Review.create(reviewData, callback);
};

// Add new User
const addUser = (userData, callback) => {
  db.User.create(userData, callback);
};

// Add new Photo
const addPhoto = (photoData, callback) => {
  db.Photo.create(photoData, callback);
};

module.exports = {
  addAttraction: addAttraction,
  addReview: addReview,
  addUser: addUser,
  addPhoto: addPhoto,
};