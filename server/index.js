const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log('trypadvisorReviews service listening on port', port));