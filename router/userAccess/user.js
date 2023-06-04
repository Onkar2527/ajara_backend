const express = require('express');
const router = express.Router()


router
    .post('/getUserIdByKey',require('../../services/userAccess/user').getUserIdByKey)
    

module.exports = router;