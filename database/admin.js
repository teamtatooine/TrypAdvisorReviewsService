const db = require('./index.js');

// Log all collections without populating nested schema objects
const logAll = () => {
  db.Attraction.find().exec((err, data) => { console.log('ATTRACTIONS', data) });
  db.Review.find().exec((err, data) => { console.log('REVIEWS', data) });
  db.User.find().exec((err, data) => { console.log('USERS', data) });
  db.Photo.find().exec((err, data) => { console.log('PHOTOS', data) });
};

// Log all collections and populate nested schema objects
const logAllAndPopulate = () => {
  db.Attraction.find().populate('reviews photos').exec((err, data) => { console.log('ATTRACTIONS', data) });
  db.Review.find().populate('attraction user photos').exec((err, data) => { console.log('REVIEWS', data) });
  db.User.find().populate('reviews photos').exec((err, data) => { console.log('USERS', data) });
  db.Photo.find().populate('review user').exec((err, data) => { console.log('PHOTOS', data) });
};

module.exports = {
  logAll: logAll,
  logAllAndPopulate: logAllAndPopulate,
};