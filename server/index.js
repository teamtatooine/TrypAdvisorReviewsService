const express = require('express');
const path = require('path');
const reviewRouter = require('./routers/review.js');
require('dotenv').config();

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(express.static(__dirname + '/../../../TrypAdvisorClient/dist'));

app.use('/api/review', reviewRouter);

const port = process.env.PORT || 3000
app.listen(port, () => console.log('trypadvisorReviews service listening on port', port));