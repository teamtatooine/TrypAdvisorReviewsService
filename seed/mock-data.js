const faker = require('faker/locale/en_US');

// Create 1 attraction
const attractions = [];

attractions.push(
  {
    name: 'Haleakala Crater',
    description: "A dormant volcano measuring 10,000 feet above sea level, it is Maui's highest point.",
    mainPhotoUrl: "https://media-cdn.tripadvisor.com/media/photo-l/0f/35/cc/02/photo1jpg.jpg",
    phone: '+1 808-572-4400',
    email: '',
    website: 'https://www.nps.gov/hale',
    suggestedDuration: 'more than 3 hours',
    featuredIn: 'Guide to Lahaina Outdoors',
    address1: 'Haleakala National Park',
    address2: '',
    city: 'Maui',
    state: 'HI',
    zip: '96768',
    lat: 20.718611,
    lng: -156.182778,
    category: 'Nature & Parks, Volcanos, More',
    reviews: [],
    photos: []
  }
);

// for (var i = 0; i < 1; i++) {
//   attractions.push(
//     {
//       name: faker.name.findName(),
//       description: faker.lorem.sentence(),
//       mainPhotoUrl: "https://media-cdn.tripadvisor.com/media/photo-l/0f/35/cc/02/photo1jpg.jpg",
//       phone: faker.phone.phoneNumber(),
//       email: faker.internet.email(),
//       website: faker.internet.url(),
//       suggestedDuration: Math.floor(Math.random() * 10) + 1,
//       featuredIn: faker.lorem.words(),
//       address1: faker.address.streetAddress(),
//       address2: faker.address.secondaryAddress(),
//       city: faker.address.city(),
//       state: faker.address.state(),
//       zip: faker.address.zipCode(),
//       lat: Number(faker.address.latitude()),
//       lng: Number(faker.address.longitude()),
//       category: faker.commerce.department(),
//       reviews: [],
//       photos: []
//     }
//   );
// };

// Create 100 reviews
const reviews = [];
const typeOfVisitChoices = ['couples', 'family', 'friends', 'business', 'solo'];
const recommendedLengthOfVisitChoices = ['<1 hour', '1-2 hours', '2-3 hours', 'more than 3 hours']
const choices = ['yes', 'no', 'not sure'];

for (var i = 0; i < 100; i++) {
  reviews.push(
    {
      attraction: null,
      user: null,
      userRating: Math.floor(Math.random() * 5) + 1,
      reviewDate: null,
      title: faker.company.bsAdjective() + ' ' + faker.company.bsNoun(),
      description: faker.company.catchPhrase() + '. ' + faker.company.catchPhrase() + '.' + faker.company.catchPhrase() + '.' + faker.company.catchPhrase() + '.' + faker.company.catchPhrase() + '.',
      upVote: Math.floor(Math.random() * 15),
      typeOfVisit: typeOfVisitChoices[Math.floor(Math.random() * 5)],
      visitDate: faker.date.past(),
      recommendedLengthOfVisit: recommendedLengthOfVisitChoices[Math.floor(Math.random() * 4)],
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

// Create 99 users
const users = [];

for (var i = 0; i < 20; i++) {
  users.push(
    {
      userName: faker.name.findName(),
      profilePicture: faker.image.avatar(),
      memberSince: faker.date.past(),
      location: faker.address.city() + ', ' + faker.address.state(),
      reviews: [],
      photos: []
    }
  );
};

// Create 1 unique user (ME)
users.push(
  {
    userName: 'James Lee',
    profilePicture: 'https://avatars3.githubusercontent.com/u/35130636?s=460&v=4',
    memberSince: faker.date.past(),
    location: 'Seattle, WA',
    reviews: [],
    photos: []
  }
);

// Create 200 photos
const photos = [];

for (var i = 0; i < 200; i++) {
  photos.push(
    {
      review: null,
      user: null,
      caption: faker.lorem.sentence(),
      imageUrl: "https://picsum.photos/200/300?image=" + Math.floor(Math.random() * 1000)
    }
  );
};

module.exports.attractions = attractions;
module.exports.reviews = reviews;
module.exports.users = users;
module.exports.photos = photos;