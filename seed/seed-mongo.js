const db = require('../database-mongo/index.js');
const dbAdmin = require('../database-mongo/admin.js');
const dbControllers = require('../database-mongo/controllers.js');
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

// Create links between attractions, reviews, users, and photos
const addLinks = async () => {

  let attractionIds = [];
  let reviewIds = [];
  let userIds = [];
  let photoIds = [];

  // Get all attractionIds
  const attractions = await db.Attraction.find();
  attractions.forEach(attraction => {
    attractionIds.push(attraction._id);
  });
  console.log('Attraction IDs', attractionIds);

  // Get all reviewIds
  const reviews = await db.Review.find();
  reviews.forEach(review => {
    reviewIds.push(review._id);
  });
  console.log('Review IDs',reviewIds);

  // Get all userIds
  const users = await db.User.find();
  users.forEach(user => {
    userIds.push(user._id);
  });
  console.log('User IDs', userIds);

  // Get all photoIds
  const photos = await db.Photo.find();
  photos.forEach(photo => {
    photoIds.push(photo._id);
  });
  console.log('Photo IDs', photoIds);

  // Create one to many links for Reviews
  for (const review of reviews) {
    // Assign random Attraction and User to Review
    const randomAttraction = await attractionIds[getRandomInteger(attractionIds.length)];
    const randomUser = await userIds[getRandomInteger(userIds.length)];
    review.attraction = randomAttraction;
    review.user = randomUser;
    await review.save();

    // Update Attraction & User collection with Review id
    await dbControllers.updateAttraction(randomAttraction, {$push: {reviews: review._id}}, (err, result) => {
      (err) ? console.log('Error', err) : console.log('Attraction updated', result);
    });
    await dbControllers.updateUser(randomUser, {$push: {reviews: review._id}}, (err, result) => {
      (err) ? console.log('Error', err) : console.log('User updated', result);
    });
  };

  // Create one to many links for Photos
  for (const photo of photos) {
    // Assign random Review
    const selectedReview = await reviewIds[getRandomInteger(reviewIds.length)];
    photo.review = selectedReview;

    // Assign User corresponding to Review
    const foundReview = await db.Review.findById(selectedReview);
    photo.user = foundReview.user;
    await photo.save();

    // Update Attraction, Review, & User collection with Photo id
    await dbControllers.updateAttraction(foundReview.attraction, {$push: {photos: photo._id}}, (err, result) => {
      (err) ? console.log('Error', err) : console.log('Attraction updated', result);
    });
    await dbControllers.updateReview(selectedReview, {$push: {photos: photo._id}}, (err, result) => {
      (err) ? console.log('Error', err) : console.log('Review updated', result);
    });
    await dbControllers.updateUser(photo.user, {$push: {photos: photo._id}}, (err, result) => {
      (err) ? console.log('Error', err) : console.log('User updated', result);
    });
  };
};

// Seed database and add links
async function seedDbAndLink() {
  await seedDb();
  await addLinks();
  dbAdmin.logAll();
};

// EXECUTION FUNCTIONS
seedDbAndLink();
// dbAdmin.logAll();
// dbAdmin.logAllAndPopulate();
// dbAdmin.deleteAllLinks();
// dbAdmin.deleteAll();
