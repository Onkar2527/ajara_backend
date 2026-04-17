const express = require('express');
const router = express.Router();


router
    .post('/getAllReports', require('../services/report').getAllReports)
    .post('/getStageWiseReport', require('../services/report').getStageWiseReport)
    .post('/getAadhaarPanReport', require('../services/report').getAadhaarPanReport)
    .post('/getBranchWiseReport', require('../services/report').getBranchWiseReport)
    .post('/getAadhaarPanVerificationReport', require('../services/report').getAadhaarPanVerificationReport)





module.exports = router