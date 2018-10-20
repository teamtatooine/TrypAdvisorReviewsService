const db = require('./index.js');

// Functions to add records
  const addAttraction = (attractionData, callback) => {
    db.Attraction.create(attractionData, callback);
  };

  const addReview = (reviewData, callback) => {
    reviewData.reviewDate = new Date();
    db.Review.create(reviewData, callback);
  };

  const addUser = (userData, callback) => {
    db.User.create(userData, callback);
  };

  const addPhoto = (photoData, callback) => {
    db.Photo.create(photoData, callback);
  };

// Functions to update records
  const updateAttraction = (attractionId, parameters, callback) => {
    db.Attraction.findByIdAndUpdate(attractionId, parameters, callback);
  };

  const updateReview = (reviewId, parameters, callback) => {
    db.Review.findByIdAndUpdate(reviewId, parameters, callback);
  };

  const updateUser = (userId, parameters, callback) => {
    db.User.findByIdAndUpdate(userId, parameters, callback);
  };

  const updatePhoto = (photoId, parameters, callback) => {
    db.Photo.findByIdAndUpdate(photoId, parameters, callback);
  };

module.exports = {
  addAttraction: addAttraction,
  addReview: addReview,
  addUser: addUser,
  addPhoto: addPhoto,
  updateAttraction: updateAttraction,
  updateReview: updateReview,
  updateUser: updateUser,
  updatePhoto: updatePhoto
};