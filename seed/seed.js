const db = require('../database/index.js');
const dbAdmin = require('../database/admin.js');
const dbControllers = require('../database/controllers.js');
const mockData = require('./mock-data.js');

// Add mock data to database
const seedDb = () => {
  for (attraction of mockData.attractions) {
    dbControllers.addAttraction(attraction, (err, result) => {
      (err) ? console.log('Error', err) : console.log('Attraction saved to database', result);
    });
  };
  for (review of mockData.reviews) {
    dbControllers.addReview(review, (err, result) => {
      (err) ? console.log('Error', err) : console.log('Review saved to database', result);
    });
  };
  for (user of mockData.users) {
    dbControllers.addUser(user, (err, result) => {
      (err) ? console.log('Error', err) : console.log('User saved to database', result);
    });
  };
  for (photo of mockData.photos) {
    dbControllers.addPhoto(photo, (err, result) => {
      (err) ? console.log('Error', err) : console.log('Photo saved to database', result);
    });
  };
};

// EXECUTION FUNCTIONS
seedDb();
dbAdmin.logAll();
// dbAdmin.logAllAndPopulate();
// dbAdmin.deleteAll();