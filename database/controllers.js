const db = require('./index.js');

// Functions to get records
  const getAttraction = (attractionId, callback) => {
    db.Attraction.find().exec(callback);
  };

  const getReviews = async (filters, callback) => {
    const parameters = [{
      $addFields: { "month": { $month: '$visitDate' } }
    }, {
      $match: filters
    }, {
      $sort : { reviewDate: -1 }
    }];
    db.Review.aggregate(parameters, callback);
  };

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

// Functions to delete records
  const deleteAttraction = (attractionId, callback) => {
    db.Attraction.deleteOne({ _id: attractionId }, callback);
  };

  const deleteReview = (reviewId, callback) => {
    db.Review.deleteOne({ _id: reviewId }, callback);
  };

  const deleteUser = (userId, callback) => {
    db.User.deleteOne({ _id: userId }, callback);
  };

  const deletePhoto = (photoId, callback) => {
    db.Photo.deleteOne({ _id: photoId }, callback);
  };

module.exports = {
  getAttraction: getAttraction,
  getReviews: getReviews,
  addAttraction: addAttraction,
  addReview: addReview,
  addUser: addUser,
  addPhoto: addPhoto,
  updateAttraction: updateAttraction,
  updateReview: updateReview,
  updateUser: updateUser,
  updatePhoto: updatePhoto,
  deleteAttraction: deleteAttraction,
  deleteReview: deleteReview,
  deleteUser: deleteUser,
  deletePhoto: deletePhoto
};