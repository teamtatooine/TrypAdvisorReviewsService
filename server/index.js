const express = require('express');
const reviewRouter = require('./routers/review.js');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  next();
});

app.use('/api/review', reviewRouter);

const port = 4000
app.listen(port, () => console.log('trypadvisorReviews service listening on port', port));