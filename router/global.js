const express = require('express');
const router = express.Router()
const globalService = require('../services/global')

router
    //.all('*', globalService.requireAuthentication)
    // .use('/api', globalService.checkToken)
    .use('/api/basicDetails', require('./basicDetails'))
    .use('/api/applicantPersonalInformation', require('./applicantPersonalInformation'))
    .use('/api/termDeposite', require('./termDepsit'))
    .use('/api/nomineeDetails', require('./nomineeDetails'))
    .use('/api/facilities', require('./facilities'))
    .use('/api/financialInformation', require('./financialInformation'))
    .use('/api/personalInformation', require('./applicantPersonalInformation'))
    .use('/api/loanInformation', require('./loanInformation'))
    .use('/api/otherBankAccounts', require('./otherBankAccounts'))
    .use('/api/propertyInformation', require('./propertyInformation'))
    .use('/api/documentGroup', require('./documentGroup'))
    .use('/api/document', require('./document'))
    .use('/api/user', require('./userAccess/user'))
    .use('/api/emailVerification', require('./emailVerification'))
    .use('/api/aadhaar', require('./aadhaar'))


    //.use('/api/accountHistory', require('./accountHistory'))
    .use('/api/componunts', require('./componunt'))
    .use('/api/tabs', require('./tabs'))
    .use('/api/extraInformation', require('./extraInformation'))
    .use('/api/applicantDocuments', require('./applicantDocument'))

    .use('/api/applicantsPhoto', require('./applicantsPhoto'))
    .use('/api/addressInformation', require('./addressInformation'))
    .use('/api/pan', require('./panVerifiendList'))
    .use('/api/voterId', require('./voterIdVerification'))
    .use('/api/license', require('./license'))
    

    .use('/api/pincode', require('./pincode'))

    .post('/api/user/login', require('../services/userAccess/user').login)
    .post('/api/user/getUser', require('../services/userAccess/user').getUser)
    .post('/api/user/getUserBranch',require('../services/userAccess/user').getUserBranch)
    .post('/api/user/getUserRole',require('../services/userAccess/user').getUserRole)

    .use('/api/status',require('./status'))

    .use('/api/remark',require('./remark'))

module.exports = router