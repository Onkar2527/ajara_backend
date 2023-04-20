const express = require('express');
const router = express();


router
    .post('/get', require('../services/loanInformation').get)
    .post('/create', require('../services/loanInformation').create)
    .post('/update', require('../services/loanInformation').update )

module.exports = router;