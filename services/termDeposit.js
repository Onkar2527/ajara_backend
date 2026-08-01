const db = require('../utilities/dbModule');



function reqData(req) {
    data = {

        // APPLICANT_ID : req.body.APPLICANT_ID,
        // ACCOUNT_TYPE : req.body.ACCOUNT_TYPE,
        // MODE_OF_PAYMENT: req.body.MODE_OF_PAYMENT,
        // TRANSFER_ACCOUNT_NO: req.body.TRANSFER_ACCOUNT_NO,
        // CHAQUE_NO:req.body.CHAQUE_NO,
        // DEPOSIT_AMOUNT : req.body.DEPOSIT_AMOUNT,
        // DEPOSIT_FREQUANCY: req.body.DEPOSIT_FREQUANCY,
        // RATE_OF_INTEREST : req.body.RATE_OF_INTEREST,
        // TANURE_YEARS  : req.body.TANURE_YEARS,
        // TANURE_MONTHS : req.body.TANURE_MONTHS,
        // TANURE_DAYS : req.body.TANURE_DAYS,
        // INTEREST_PAYOUT: req.body.INTEREST_PAYOUT,
        // MODE_OF_INTEREST_PAYOUT: req.body.MODE_OF_INTEREST_PAYOUT,
        // AUTO_RENEWAL: req.body.AUTO_RENEWAL,
        // DEPOSIT_BANK_NAME: req.body.DEPOSIT_BANK_NAME,
        // DEPOSIT_BRANCH_NAME: req.body.DEPOSIT_BRANCH_NAME,
        // DEPOSIT_IFSC_CODE: req.body.DEPOSIT_IFSC_CODE,
        // DEPOSIT_ACCOUNT_NUMBER: req.body.DEPOSIT_ACCOUNT_NUMBER,
        // TDS : req.body.TDS,
        // MATURITY_DATE  :req.body.MATURITY_DATE,
        // MATURITY_AMOUNT  : req.body.MATURITY_AMOUNT,
        // INITIAL_AMOUNT : req.body.INITIAL_AMOUNT,

        APPLICANT_ID: req.body.APPLICANT_ID,
        ACCOUNT_TYPE: req.body.ACCOUNT_TYPE,
        INITIAL_AMOUNT: req.body.INITIAL_AMOUNT,
        MODE_OF_PAYMENT: req.body.MODE_OF_PAYMENT,
        TRANSFER_ACCOUNT_NO: req.body.TRANSFER_ACCOUNT_NO,
        CHAQUE_NO: req.body.CHAQUE_NO,
        DRAWN_BANK: req.body.DRAWN_BANK,
        TRANSFER_DATE: req.body.TRANSFER_DATE,
        DEPOSIT_AMOUNT: req.body.DEPOSIT_AMOUNT,
        DEPOSIT_FREQUANCY: req.body.DEPOSIT_FREQUANCY,
        RATE_OF_INTEREST: req.body.RATE_OF_INTEREST,
        TANURE_YEARS: req.body.TANURE_YEARS,
        TANURE_MONTHS: req.body.TANURE_MONTHS,
        TANURE_DAYS: req.body.TANURE_DAYS,
        INTEREST_PAYOUT: req.body.INTEREST_PAYOUT,
        MODE_OF_INTEREST_PAYOUT: req.body.MODE_OF_INTEREST_PAYOUT,
        AUTO_RENEWAL: req.body.AUTO_RENEWAL,
        DEPOSIT_BANK_NAME: req.body.DEPOSIT_BANK_NAME,
        DEPOSIT_BRANCH_NAME: req.body.DEPOSIT_BRANCH_NAME,
        DEPOSIT_IFSC_CODE: req.body.DEPOSIT_IFSC_CODE,
        DEPOSIT_ACCOUNT_NUMBER: req.body.DEPOSIT_ACCOUNT_NUMBER,
        TDS: req.body.TDS,
        MATURITY_DATE: req.body.MATURITY_DATE,
        MATURITY_AMOUNT: req.body.MATURITY_AMOUNT,
        ACCOUNT_OPERATION: req.body.ACCOUNT_OPERATION,
        MOBILE_NUMBER_2: req.body.MOBILE_NUMBER_2,

        CHEQUE_BRANCH_NAME: req.body.CHEQUE_BRANCH_NAME,
        CHEQUE_BANK_NAME: req.body.CHEQUE_BANK_NAME,

        PAYMENT_INSTRUCTION: req.body.PAYMENT_INSTRUCTION,
        MINIMUM_BALANCE_CATEGORY: req.body.MINIMUM_BALANCE_CATEGORY,
        SCHEME_CODE: req.body.SCHEME_CODE

    }

    return data;
}

exports.get = async (req, res) => {
    const supportKey = req.headers['supportkey'];
    const q = `select * from term_deposite where APPLICANT_ID = ?`;
    try {
        const results = await db.executeQueryData(q, [req.body.APPLICANT_ID], supportKey);
        res.send({
            "code": 200,
            "message": "OK",
            "data": results
        });
    } catch (error) {
        console.log("error", error);
        res.status(400).send({
            "code": 400,
            "message": "Failed to get deposit details"
        });
    }
};

exports.create = async (req, res) => {
    const supportKey = req.headers['supportkey'];
    const data = reqData(req);
    const q = `insert into term_deposite set ?`;

    console.log("req body", req.body);

    try {
        await db.executeQueryData(q, data, supportKey);
        console.log("data is ---- ", data);
        res.send({
            "code": 200,
            "message": "Deposit information saved successfully"
        });
    } catch (error) {
        console.log("error", error);
        res.status(400).send({
            "code": 400,
            "message": "Failed to save term deposit information"
        });
    }
};

exports.update = async (req, res) => {
    const supportKey = req.headers['supportkey'];
    const data = reqData(req);
    let setData = '';
    let recData = [];

    Object.keys(data).forEach(key => {
        setData += `${key} = ?,`;
        recData.push(data[key]);
    });

    setData = setData.slice(0, -1);

    const q = `update term_deposite set ${setData} where ID = ?`;
    recData.push(req.body.ID);

    try {
        await db.executeQueryData(q, recData, supportKey);
        res.send({
            "code": 200,
            "message": "Term deposit information updated successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            "code": 400,
            "message": "Failed to update term_deposit."
        });
    }
};
