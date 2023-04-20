const express = require('express');
const router = express.Router()
const globalService = require('../services/global')

router
    .all('*', globalService.requireAuthentication)
    .use('/api', globalService.checkToken)
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

    .use('/api/drafts', require('./drafts'))
    //.use('/api/accountHistory', require('./accountHistory'))
   
    .use('/api/applicantsPhoto', require('./applicantsPhoto'))
    
    



module.exports = router