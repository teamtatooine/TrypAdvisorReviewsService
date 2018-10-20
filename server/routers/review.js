const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const db = require('../../database/controllers.js');

// Get request to get all Reviews
router.route('/:id')
  .get((req, res) => {});

// Post request to add new Review
router.route('/:id/add')
  .post((req, res) => {});

router.route('/:id/delete')
  .delete((req, res) => {});

module.exports = router;