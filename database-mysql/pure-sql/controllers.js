const db = require('./index.js');
const moment = require('moment');

// Functions to get records
const getAttraction = (attractionId, callback) => {
  const sql = 'SELECT * FROM attractions WHERE id = ?';

  db.connection.query(sql, attractionId, function (err, result) {
    callback(err, result[0]);
  });
};

const getReviews = (attractionId, filters, callback) => {
  // Check for Traveler Rating filters
  let ratingFilters = [];
  filters.excellent === 'true' ? ratingFilters.push(5) : null;
  filters.verygood === 'true' ? ratingFilters.push(4) : null;
  filters.average === 'true' ? ratingFilters.push(3) : null;
  filters.poor === 'true' ? ratingFilters.push(2) : null;
  filters.terrible === 'true' ? ratingFilters.push(1) : null;
  if (ratingFilters.length !== 0) {
    ratingFilters = 'AND reviews.userRating IN (' + ratingFilters.join(',') + ') ';
  };

  // Check for Traveler Type filters
  let tripTypeFilters = [];
  filters.families === 'true' ? tripTypeFilters.push('"families"') : null;
  filters.couples === 'true' ? tripTypeFilters.push('"couples"') : null;
  filters.solo === 'true' ? tripTypeFilters.push('"solo"') : null;
  filters.business === 'true' ? tripTypeFilters.push('"business"') : null;
  filters.friends === 'true' ? tripTypeFilters.push('"friends"') : null;
  if (tripTypeFilters.length !== 0) {
    tripTypeFilters = 'AND reviews.visitType IN (' + tripTypeFilters.join(',') + ') ';
  };

  // Check for Time of Year filters
  let timingFilters = [];
  filters.quarter1 === 'true' ? timingFilters.push(3, 4, 5) : null;
  filters.quarter2 === 'true' ? timingFilters.push(6, 7, 8) : null;
  filters.quarter3 === 'true' ? timingFilters.push(9, 10, 11) : null;
  filters.quarter4 === 'true' ? timingFilters.push(12, 1, 2) : null;
  if (timingFilters.length !== 0) {
    timingFilters = 'AND reviews.visitMonth IN (' + timingFilters.join(',') + ') ';
  };

  // Check for Keyword Search filters
  let searchFilter = 'AND reviews.description LIKE "%' + filters.search + '%"';

  const sql = 'SELECT reviews.*, JSON_OBJECT("id", users.id, "userName", users.userName, "profilePicture", users.profilePicture, "memberSince", users.memberSince, "location", users.location) AS userData, JSON_ARRAYAGG(JSON_OBJECT("id", photos.id, "caption", photos.caption, "imageUrl", photos.imageUrl)) AS photos FROM attractions INNER JOIN reviews ON attractions.id = reviews.attractionId INNER JOIN users ON reviews.userId = users.id LEFT OUTER JOIN photos ON photos.reviewId = reviews.id WHERE attractions.id = ? ' + ratingFilters + tripTypeFilters + timingFilters + searchFilter + 'GROUP BY reviews.id ORDER BY reviews.reviewDate DESC';

  db.connection.query(sql, attractionId, function (err, result) {
    result.forEach(result => {
      result.userData = JSON.parse(result.userData);
      result.photos = JSON.parse(result.photos);
    });
    callback(err, result);
  });
};

// Functions to add records
const addAttraction = (attractionData, callback) => {
  const sql = 'INSERT INTO attractions (name, description, mainPhotoUrl, phone, email, website, suggestedDuration, featuredIn, address1, address2, city, state, zip, lat, lng, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.connection.query(sql, [attractionData.name, attractionData.description, attractionData.mainPhotoUrl, attractionData.phone, attractionData.email, attractionData.website, attractionData.suggestedDuration, attractionData.featuredIn, attractionData.address1, attractionData.address2, attractionData.city, attractionData.state, attractionData.zip, attractionData.lat, attractionData.lng, attractionData.category], function (err, result) {
    callback(err, result);
  });
};

const addReview = (attractionId, userId, reviewData, callback) => {
  const visitDate = moment(reviewData.visitDate).format('YYYY-MM-DD');
  const visitMonth = moment(reviewData.visitDate).format('M');
  const reviewDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const sql = 'INSERT INTO reviews (attractionId, userId, userRating, reviewDate, title, description, upVote, visitType, visitDate, visitMonth, recommendedLengthOfVisit, skipLine, headCover, modestDress, payForWifi, teenagerFriendly, artsAssociated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.connection.query(sql, [attractionId, userId, reviewData.rating, reviewDate, reviewData.title, reviewData.description, reviewData.upVote || 0, reviewData.visitType, visitDate, visitMonth, reviewData.suggestedDuration, reviewData.skipLine, reviewData.headCover, reviewData.modestDress, reviewData.payForWifi, reviewData.teenagerFriendly, reviewData.artsAssociated], function (err, result) {
    callback(err, result);
  });
};

const addUser = (userData, callback) => {
  const memberSince = userData.memberSince.getUTCFullYear() + "-" + (1 + userData.memberSince.getUTCMonth()) + "-" + (userData.memberSince.getUTCDate()) + " " + (userData.memberSince.getUTCHours()) + ":" + (userData.memberSince.getUTCMinutes()) + ":" + (userData.memberSince.getUTCSeconds());
  const sql = 'INSERT INTO users (userName, profilePicture, memberSince, location) VALUES (?, ?, ?, ?)';
  db.connection.query(sql, [userData.userName, userData.profilePicture, memberSince, userData.location], function (err, result) {
    callback(err, result);
  });
};

const addPhoto = (reviewId, photoData, callback) => {
  const sql = 'INSERT INTO photos (reviewId, caption, imageUrl) VALUES (?, ?, ?)';
  db.connection.query(sql, [reviewId, photoData.caption, photoData.imageUrl], function (err, result) {
    callback(err, result);
  });
};

module.exports = {
  getAttraction: getAttraction,
  getReviews: getReviews,
  addAttraction: addAttraction,
  addReview: addReview,
  addUser: addUser,
  addPhoto: addPhoto
  // updateAttraction: updateAttraction,
  // updateReview: updateReview,
  // updateUser: updateUser,
  // updatePhoto: updatePhoto,
  // deleteAttraction: deleteAttraction,
  // deleteReview: deleteReview,
  // deleteUser: deleteUser,
  // deletePhoto: deletePhoto
};
