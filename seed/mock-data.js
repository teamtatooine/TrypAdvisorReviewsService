const faker = require('faker/locale/en_US');

// Create 1 attraction
const attractions = [];

for (var i = 0; i < 1; i++) {
  attractions.push(
    {
      name: faker.name.findName(),
      description: faker.lorem.sentence(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      website: faker.internet.url(),
      suggestedDuration: Math.floor(Math.random() * 10) + 1,
      featuredIn: faker.lorem.words(),
      address1: faker.address.streetAddress(),
      address2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip: faker.address.zipCode(),
      lat: Number(faker.address.latitude()),
      lng: Number(faker.address.longitude()),
      category: faker.commerce.department(),
      reviews: [],
      photos: []
    }
  );
};

// Create 10 reviews
const reviews = [];
const typeOfVisitChoices = ['couples', 'family', 'friends', 'business', 'solo'];
const choices = ['yes', 'no', 'not sure'];

for (var i = 0; i < 10; i++) {
  reviews.push(
    {
      attraction: null,
      user: null,
      userRating: Math.floor(Math.random() * 6),
      reviewDate: null,
      title: faker.company.bsAdjective() + ' ' + faker.company.bsNoun(),
      description: faker.company.catchPhrase() + '. ' + faker.company.catchPhrase() + '.',
      upVote: Math.floor(Math.random() * 15),
      typeOfVisit: typeOfVisitChoices[Math.floor(Math.random() * 5)],
      visitDate: faker.date.past(),
      recommendedLengthOfVisit: Math.floor(Math.random() * 10) + 1,
      skipLine: choices[Math.floor(Math.random() * 3)],
      headCover: choices[Math.floor(Math.random() * 3)],
      modestDress: choices[Math.floor(Math.random() * 3)],
      payForWifi: choices[Math.floor(Math.random() * 3)],
      teenagerFriendly: choices[Math.floor(Math.random() * 3)],
      artsAssociated: choices[Math.floor(Math.random() * 3)],
      photos: [],
      userConsent: Math.random() >= 0.5,
    }
  );
};

// Create 5 users
const users = [];

for (var i = 0; i < 5; i++) {
  users.push(
    {
      userName: faker.name.findName(),
      profilePicture: faker.image.avatar(),
      memberSince: faker.date.past(),
      reviews: [],
      photos: []
    }
  );
};

// Create 10 photos
const photos = [];

for (var i = 0; i < 10; i++) {
  photos.push(
    {
      review: null,
      user: null,
      caption: faker.lorem.sentence(),
      imageUrl: faker.image.imageUrl()
    }
  );
};

module.exports.attractions = attractions;
module.exports.reviews = reviews;
module.exports.users = users;
module.exports.photos = photos;