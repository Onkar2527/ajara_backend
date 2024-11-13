const express = require('express');
const router = express.Router();


router 
    .post('/getguardians', require('../services/guardianDocument').getAllguardians)
    .post('/create', require('../services/guardianDocument').create)
    .post('/upload', require('../services/guardianDocument').uploadDocument)
    .post('/update', require('../services/guardianDocument').update)
    




module.exports = router