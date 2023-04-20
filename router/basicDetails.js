const express = require('express');
const router = express.Router();


router 
    .post('/get', require('../services/basicDetails').get)
    .post('/create', require('../services/basicDetails').create)
    .post('/update', require('../services/basicDetails').update )




module.exports = router