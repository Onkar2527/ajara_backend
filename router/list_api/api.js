const express = require('express');
const router = express.Router();


router
    .post('/onBoardCustomer', require('../../services/list_api/api').onBoardCustomer)
    .post('/getMasters', require('../../services/list_api/api').getMasters)


module.exports = router