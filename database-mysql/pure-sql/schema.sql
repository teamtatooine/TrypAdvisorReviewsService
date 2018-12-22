/*  Execute this file from the command line by typing:
 *    mysql -u root -p < database-mysql/pure-sql/schema.sql
 *  to create the database and the tables.*/

DROP DATABASE IF EXISTS trypadvisor;

CREATE DATABASE trypadvisor;

USE trypadvisor;

DROP TABLE IF EXISTS `attraction`;

CREATE TABLE attractions (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  description varchar(250) NOT NULL,
  mainPhotoUrl varchar(200) NOT NULL,
  phone varchar(25) NOT NULL,
  email varchar(50) NOT NULL,
  website varchar(200) NOT NULL,
  suggestedDuration varchar(20) NOT NULL,
  featuredIn varchar(50) NOT NULL,
  address1 varchar(50) NOT NULL,
  address2 varchar(50) NOT NULL,
  city varchar(20) NOT NULL,
  state varchar(20) NOT NULL,
  zip varchar(15) NOT NULL,
  lat float NOT NULL,
  lng float NOT NULL,
  category varchar(30) NOT NULL,
  PRIMARY KEY (id)
)ENGINE=INNODB;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  userName varchar(50) NOT NULL,
  profilePicture varchar(250) NOT NULL,
  memberSince datetime NOT NULL,
  location varchar(50) NOT NULL,
  PRIMARY KEY (id)
)ENGINE=INNODB;

CREATE TABLE reviews (
  id int NOT NULL AUTO_INCREMENT,
  attractionId int NOT NULL,
  userId int NOT NULL,
  userRating int NOT NULL,
  reviewDate datetime NOT NULL,
  title varchar(120) NOT NULL,
  description varchar(20000) NOT NULL,
  upVote int NOT NULL,
  visitType varchar(10) NOT NULL,
  visitDate datetime NOT NULL,
  visitMonth int NOT NULL,
  recommendedLengthOfVisit varchar(20),
  skipLine varchar(10),
  headCover varchar(10),
  modestDress varchar(10),
  payForWifi varchar(10),
  teenagerFriendly varchar(10),
  artsAssociated varchar(10),
  PRIMARY KEY (id),
  FOREIGN KEY (attractionId) REFERENCES
  attractions(id),
  FOREIGN KEY (userId) REFERENCES
  users(id)
)ENGINE=INNODB;


CREATE TABLE photos (
  id int NOT NULL AUTO_INCREMENT,
  reviewId int NOT NULL,
  caption varchar(200) NOT NULL,
  imageUrl varchar(200) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (reviewId) REFERENCES
  reviews(id)
)ENGINE=INNODB;
