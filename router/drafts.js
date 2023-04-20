const express = require('express');
const router = express()


router
    .post('/get', require('../services/drafts').get)


module.exports = router;