const db = require('../utilities/dbModule');



function reqData(req)
{
    data = {
        APPLICANT_ID : req.body.APPLICANT_ID,
        CHEQUE_BOOK: req.body.CHEQUE_BOOK,
        PASS_BOOK: req.body.PASS_BOOK,
        STATEMENT_BY_EMAIL: req.body.STATEMENT_BY_EMAIL,
        SMS_ALERT: req.body.SMS_ALERT,
        ATM_CARD: req.body.ATM_CARD,
        CONSENT_NEW_PRODUCT: req.body.CONSENT_NEW_PRODUCT,
        ADDON_CARD: req.body.ADDON_CARD,
        APPLICANT1_NAME: req.body.APPLICANT1_NAME,
        APPLICANT2_NAME: req.body.APPLICANT2_NAME,
        APPLICANT3_NAME: req.body.APPLICANT3_NAME,
        APPLICANT4_NAME: req.body.APPLICANT4_NAME,
        UPI: req.body.UPI,
        MOBILE_BANKING: req.body.MOBILE_BANKING
    }

    return data;
}

exports.get = async (req, res) => {
    const supportKey = req.headers['supportkey'];
    const q = `select * from facilities where APPLICANT_ID = ?`;
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
            "message": "Failed to get facilities details"
        });
    }
};

exports.create = async (req, res) => {
    const supportKey = req.headers['supportkey'];
    const data = reqData(req);
    const q = `insert into facilities set ?`;

    try {
        await db.executeQueryData(q, data, supportKey);
        res.send({
            "code": 200,
            "message": "Facilities information saved successfully"
        });
    } catch (error) {
        console.log("error", error);
        res.status(400).send({
            "code": 400,
            "message": "Failed to save facilities information"
        });
    }
};

exports.update = async (req, res) => {
    const supportKey = req.headers['supportkey'];
    const data = reqData(req);
    let setData = '';
    let recData = [];

    Object.keys(data).forEach(key => {
        setData += `${key} = ? ,`;
        recData.push(data[key]);
    });

    setData = setData.slice(0, -1);

    const q = `update facilities set ${setData} where ID = ?`;
    recData.push(req.body.ID);

    try {
        await db.executeQueryData(q, recData, supportKey);
        res.send({
            "code": 200,
            "message": "Facilities information updated successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            "code": 400,
            "message": "Failed to update facilities."
        });
    }
};
