const express = require('express');
const router = express.Router();
const listApi = require('../../services/list_api/api');

router
    .post('/onBoardCustomer', require('../../services/list_api/api').onBoardCustomer)
    .post('/getMasters', require('../../services/list_api/api').getMasters)
    .post('/getCustomer', require('../../services/list_api/api').getCustomer)
    .post('/getInterestRateForAllAcc', require('../../services/list_api/api').getInterestRateForAllAcc)
    .get('/getInterestRateForAllAcc', require('../../services/list_api/api').getInterestRateForAllAcc);

module.exports = router;
