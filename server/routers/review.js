require('dotenv').config();
const express = require('express');
const router = express.Router();

let db = null;

if (process.env.DATABASE === "mongo") {
  db = require('../../database-mongo/controllers.js');
} else if (process.env.DATABASE === "mysql") {
  db = require('../../database-mysql/pure-sql/controllers.js');
} else {
  console.log('No database defined in .env file');
};

// Get request to retrieve attraction info
router.route('/:id/attraction')
  .get((req, res) => {
    const attractionId = req.params.id;

    db.getAttraction(attractionId, (err, result) => {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Attraction returned', result);
        res.send(result);
      };
    })
  });

// Post request to GET all or filtered Reviews
router.route('/:id')
  .post((req, res) => {
    const attractionId = req.params.id;
    const filters = req.body;

    // Get Reviews from db based on filters
    db.getReviews(attractionId, filters, (err, result) => {
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
router.route('/:id/add/:userid')
  .post((req, res) => {
    const attractionId = req.params.id;
    const userId = req.params.userid;
    const reviewData = req.body;

    db.addReview(attractionId, userId, reviewData, (err, result) => {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Review saved to database', result);
        res.send(result);
      };
    });
  });

// Delete request to delete Review
router.route('/:id/delete')
  .delete((req, res) => {
    const reviewId = mongoose.Types.ObjectId(req.params.id);
    db.deleteReview(reviewId, (err, result) => {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Review deleted database', result);
        res.send(result);
      };
    });
  });

// Post request to add new Attraction
// router.route('/add')
//   .post(function(req, res) {
//     const attractionData = {
//       name: 'Bertram Bogisich',
//       description: 'Dolorum laboriosam dolorem dolorum placeat nobis.',
//       phone: '(413) 689-9034 x4444',
//       email: 'Sim_McCullough@yahoo.com',
//       website: 'http://vito.info',
//       suggestedDuration: 42317,g
//       featuredIn: 'magni ratione quia',
//       address1: '7766 Shanahan Lakes',
//       address2: 'Suite 886',
//       city: 'West Oran',
//       state: 'Georgia',
//       zip: '35871',
//       lat: '-82.9094',
//       lng: '-42.1299',
//       category: 'Music'
//     };

//     db.addAttraction(attractionData, (err, result) => {
//       if (err) {
//         console.log('Error', err);
//       } else {
//         console.log('Attraction saved to database', result);
//         res.send(result);
//       };
//     });
//   });

module.exports = router;
