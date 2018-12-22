require('dotenv').config();
const Sequelize = require('sequelize');

const db = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// db.query("set FOREIGN_KEY_CHECKS=0");

const Attraction = db.define('attraction', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  mainPhotoUrl: Sequelize.STRING,
  phone: Sequelize.STRING,
  email: Sequelize.STRING,
  website: Sequelize.STRING,
  suggestedDuration: Sequelize.STRING,
  featuredIn: Sequelize.STRING,
  address1: Sequelize.STRING,
  address2: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zip: Sequelize.STRING,
  lat: Sequelize.INTEGER,
  lng: Sequelize.INTEGER,
  category: Sequelize.STRING,
});

const Review = db.define('review', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  attraction: {type: Schema.Types.ObjectId, ref: 'Attraction'},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  userRating: Sequelize.INTEGER,
  reviewDate: Sequelize.DATE,
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  upVote: Sequelize.INTEGER,
  visitType: Sequelize.STRING,
  visitDate: Sequelize.DATE,
  recommendedLengthOfVisit: Sequelize.STRING,
  skipLine: Sequelize.STRING,
  headCover: Sequelize.STRING,
  modestDress: Sequelize.STRING,
  payForWifi: Sequelize.STRING,
  teenagerFriendly: Sequelize.STRING,
  artsAssociated: Sequelize.STRING,
});

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userName: Sequelize.STRING,
  profilePicture: Sequelize.STRING,
  memberSince: Sequelize.DATE,
  location: Sequelize.STRING,
});

const Photo = db.define('photo', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  review: {type: Schema.Types.ObjectId, ref: 'Review'},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  caption: Sequelize.STRING,
  imageUrl: Sequelize.STRING
});

// db.query("set FOREIGN_KEY_CHECKS=1");

Attraction.hasMany(Review, {foreignKey: 'attraction_id'});
Attraction.hasMany(Photo, {foreignKey: 'attraction_id'});
Review.belongsTo(User, {foreignKey: 'user_id'});
Review.hasMany(Photo, {foreignKey: 'photo_id'});

Attraction.sync();
Review.sync();
User.sync();
Photo.sync();

module.exports = {
  Attraction: Attraction,
  Review: Review,
  User: User,
  Photo: Photo
};
