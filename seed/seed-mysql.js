const db = require('../database-mysql/pure-sql/index.js');
const dbControllers = require('../database-mysql/pure-sql/controllers.js');
const mockData = require('./mock-data.js');

const getRandomInteger = (range) => {
  return Math.floor(Math.random() * range);
};

// Add mock data to database
const seedDb = () => {
  for (attraction of mockData.attractions) {
    dbControllers.addAttraction(attraction, (err, result) => {
      (err) ? console.log('Error', err) : console.log('Attraction saved to database', result);
    });
  };
  for (user of mockData.users) {
    dbControllers.addUser(user, (err, result) => {
      (err) ? console.log('Error', err) : console.log('User saved to database', result);
    });
  };
  for (review of mockData.reviews) {
    const randomAttraction = getRandomInteger(mockData.attractions.length) + 1;
    const randomUser = getRandomInteger(mockData.users.length) + 1;
    dbControllers.addReview(randomAttraction, randomUser, review, (err, result) => {
      (err) ? console.log('Error', err) : console.log('Review saved to database', result);
    });
  };
  for (photo of mockData.photos) {
    const randomReview = getRandomInteger(mockData.reviews.length) + 1;
    dbControllers.addPhoto(randomReview, photo, (err, result) => {
      (err) ? console.log('Error', err) : console.log('Photo saved to database', result);
    });
  };
  db.connection.end();
};

// EXECUTION FUNCTIONS
seedDb();
// dbAdmin.logAll();
// dbAdmin.logAllAndPopulate();
// dbAdmin.deleteAllLinks();
// dbAdmin.deleteAll();
