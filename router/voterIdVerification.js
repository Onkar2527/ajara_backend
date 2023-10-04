const express = require('express');
const router = express.Router();
const voterIdVerificationService = require('../services/voterIdVerification')

router 
    .post('/get', voterIdVerificationService.get)
    .post('/create', voterIdVerificationService.create)
    .post('/update', voterIdVerificationService.update )
    



module.exports = router