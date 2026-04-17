
function testLogic(basicR, personalR, custobj_join, custobj_const) {
    let account_opening_data = {
        custobj: { minor: '' },
        acmst_obj: { jointacc: 'N' }
    };

    // Current logic implementation (copied from api.js)
    let isMinorAccount = (
        basicR.IS_MINOR == 1 ||
        basicR.IS_MINOR == '1' ||
        personalR.IS_MINOR == 1 ||
        personalR.IS_MINOR == '1' ||
        basicR.CUSTOMER_TYPE_1 == 'MNR' ||
        basicR.CUSTOMER_TYPE_1 == 'MINOR' ||
        (basicR.GUARDIAN_NAME && basicR.GUARDIAN_NAME !== '') ||
        (basicR.RELATION_WITH_MINOR && basicR.RELATION_WITH_MINOR !== '')
    );

    if (isMinorAccount) {
        account_opening_data.custobj.minor = 'Y';
        account_opening_data.acmst_obj.jointacc = 'N';
    } else {
        account_opening_data.custobj.minor = 'N';
        if (basicR.NO_OF_APPLICANT > 1 || custobj_join != null || custobj_const != null) {
            account_opening_data.acmst_obj.jointacc = 'Y';
        } else {
            account_opening_data.acmst_obj.jointacc = 'N';
        }
    }

    return {
        minor: account_opening_data.custobj.minor,
        jointacc: account_opening_data.acmst_obj.jointacc,
        isMinorAccount: isMinorAccount
    };
}

console.log("Scenario 1: Minor (IS_MINOR missing, but GUARDIAN_NAME present)");
console.log(JSON.stringify(testLogic({ IS_MINOR: 0, NO_OF_APPLICANT: 2, GUARDIAN_NAME: 'John Doe' }, { IS_MINOR: 0 }, null, null)));

console.log("\nScenario 2: Minor (IS_MINOR missing, but RELATION_WITH_MINOR present)");
console.log(JSON.stringify(testLogic({ IS_MINOR: 0, NO_OF_APPLICANT: 2, RELATION_WITH_MINOR: 'Father' }, { IS_MINOR: 0 }, null, null)));

console.log("\nScenario 3: Non-Minor Joint (No guardian fields)");
console.log(JSON.stringify(testLogic({ IS_MINOR: 0, NO_OF_APPLICANT: 2 }, { IS_MINOR: 0 }, {}, null))); 
