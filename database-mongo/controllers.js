const db = require('./index.js');
const mongoose = require('mongoose');

// Functions to get records
const getAttraction = (attractionId, callback) => {
  const attraction = mongoose.Types.ObjectId(attractionId);
  db.Attraction.findById(attraction).exec(callback);
};

const getReviews = async (attractionId, filters, callback) => {
  const query = {};
  query.attraction = mongoose.Types.ObjectId(attractionId);

  // Check for Traveler Rating filters
  const ratings = [];
    filters.excellent === 'true' ? ratings.push(5) : null;
    filters.verygood === 'true' ? ratings.push(4) : null;
    filters.average === 'true' ? ratings.push(3) : null;
    filters.poor === 'true' ? ratings.push(2) : null;
    filters.terrible === 'true' ? ratings.push(1) : null;
    if (ratings.length !== 0) {
      query.userRating = { $in: ratings };
  }

  // Check for Traveler Type filters
  const visitTypes = [];
  filters.families === 'true' ? visitTypes.push('family') : null;
  filters.couples === 'true' ? visitTypes.push('couples') : null;
  filters.solo === 'true' ? visitTypes.push('solo') : null;
  filters.business === 'true' ? visitTypes.push('business') : null;
  filters.friends === 'true' ? visitTypes.push('friends') : null;
  if (visitTypes.length !== 0) {
    query.visitType = { $in: visitTypes };
  };

  // Check for Time of Year filters
  const timing = [];
  filters.quarter1 === 'true' ? timing.push(3, 4, 5) : null;
  filters.quarter2 === 'true' ? timing.push(6, 7, 8) : null;
  filters.quarter3 === 'true' ? timing.push(9, 10, 11) : null;
  filters.quarter4 === 'true' ? timing.push(12, 1, 2) : null;
  if (timing.length !== 0) {
    query.month = { $in: timing };
  };

  // Check for Keyword Search filters
  keywords = new RegExp(filters.search, 'i');
  query.description = keywords;

  const parameters = [{
    $addFields: { "month": { $month: '$visitDate' } }
  }, {
    $match: query
  }, {
    $lookup:
     {
       from: "users",
       localField: "user",
       foreignField: "_id",
       as: "userData"
     }
  }, {
    $sort: { reviewDate: -1 }
  }];
  db.Review.aggregate(parameters, callback);
};

const getPhoto = (photoId, callback) => {
  db.Photo.findById(photoId, callback);
};

// Functions to add records
const addAttraction = (attractionData, callback) => {
  db.Attraction.create(attractionData, callback);
};

const addReview = (attractionId, userId, reviewData, callback) => {
  const parameters = {
    attraction: mongoose.Types.ObjectId(attractionId),
    user: mongoose.Types.ObjectId(userId),
    userRating: reviewData.rating,
    title: reviewData.title,
    description: reviewData.description,
    upVote: 0,
    visitType: reviewData.visitType,
    visitDate: reviewData.visitDate,
    recommendedLengthOfVisit: reviewData.visitLength,
    skipLine: reviewData.skipLine,
    headCover: reviewData.headCover,
    modestDress: reviewData.modestDress,
    payForWifi: reviewData.payForWifi,
    teenagerFriendly: reviewData.teenagerFriendly,
    artsAssociated: reviewData.artsAssociated,
    // TODO: Add photo posting capabiity
    photos: [],
  };
  parameters.reviewDate = new Date();
  db.Review.create(parameters, callback);
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
  getPhoto: getPhoto,
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
