const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const db = require('../../database/controllers.js');

// Get request to get all Reviews
router.route('/:id')
  .get((req, res) => {
    // Get Reviews from db based on filters
    filters = { attraction: mongoose.Types.ObjectId(req.params.id) };
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