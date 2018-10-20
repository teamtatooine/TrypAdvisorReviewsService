const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const db = require('../../database/controllers.js');

// Post request to GET all or filtered Reviews
router.route('/:id')
  .post((req, res) => {
    const filters = {};
    filters.attraction = mongoose.Types.ObjectId(req.params.id);

    // Check for Traveler Rating filters
    const ratings = [];
    req.body.excellent === 'true' ? ratings.push(5) : null;
    req.body.verygood === 'true' ? ratings.push(4) : null;
    req.body.average === 'true' ? ratings.push(3) : null;
    req.body.poor === 'true' ? ratings.push(2) : null;
    req.body.terrible === 'true' ? ratings.push(1) : null;
    if (ratings.length !== 0) {
      filters.userRating = { $in: ratings };
    };

    // Get Reviews from db based on filters
    db.getReviews(filters, (err, result) => {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Reviews returned', result);
        res.send(result);
      };
    })
  });

// Post request to add new Review
router.route('/:id/add')
  .post((req, res) => {});

router.route('/:id/delete')
  .delete((req, res) => {});

module.exports = router;