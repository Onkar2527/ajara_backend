const express = require('express');
const router = express.Router();


router 
    .post('/get', require('../services/basicDetails').get)
    .post('/create', require('../services/basicDetails').create)
    .post('/update', require('../services/basicDetails').update )
    .post('/getAll', require('../services/basicDetails').getAll )




module.exports = router