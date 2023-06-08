const express = require('express');
const router = express.Router();


router 
    .post('/getAllApplicants', require('../services/applicantDocument').getAllApplicants)
    .post('/create', require('../services/applicantDocument').create)
    .post('/upload', require('../services/applicantDocument').uploadDocument)
    .post('/update', require('../services/applicantDocument').update)
    




module.exports = router