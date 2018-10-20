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

    // Check for Traveler Type filters
    const visitTypes = [];
    req.body.families === 'true' ? visitTypes.push('family') : null;
    req.body.couples === 'true' ? visitTypes.push('couples') : null;
    req.body.solo === 'true' ? visitTypes.push('solo') : null;
    req.body.business === 'true' ? visitTypes.push('business') : null;
    req.body.friends === 'true' ? visitTypes.push('friends') : null;
    if (visitTypes.length !== 0) {
      filters.typeOfVisit = { $in: visitTypes };
    };

    // Check for Time of Year filters
    const timing = [];
    req.body.quarter1 === 'true' ? timing.push(3, 4, 5) : null;
    req.body.quarter2 === 'true' ? timing.push(6, 7, 8) : null;
    req.body.quarter3 === 'true' ? timing.push(9, 10, 11) : null;
    req.body.quarter4 === 'true' ? timing.push(12, 1, 2) : null;
    if (timing.length !== 0) {
      filters.month = { $in: timing };
    };

    // Check for Keyword Search filters
    keywords = new RegExp(req.body.search, 'i');
    filters.description = keywords;

    // Get Reviews from db based on filters
    db.getReviews(filters, (err, result) => {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Reviews returned', result);
        console.log('Review Count:', result.length);
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