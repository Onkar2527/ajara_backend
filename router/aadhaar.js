const express = require('express');
const router = express();


router
    .post('/get', require('../services/aadhaar').get)
    .post('/create', require('../services/aadhaar').create)
  

module.exports = router;