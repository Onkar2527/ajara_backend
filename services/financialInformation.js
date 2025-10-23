const db = require('../utilities/dbModule');


function reqData(req) {
    let data = {
        
        APPLICANT_ID : req.body.APPLICANT_ID,
        APPLICANT_NO : req.body.APPLICANT_NO,
        INCOME : req.body.INCOME,
        SOURCE_OF_BUSINESS : req.body.SOURCE_OF_BUSINESS

    }

    return data;
}


exports.get = async (req, res) => {
    const q = `select * from financial_information where APPLICANT_ID = ? ` + (req.body.APPLICANT_NO ? 'AND APPLICANT_NO = ?' : '');
    const params = [req.body.APPLICANT_ID];
    if (req.body.APPLICANT_NO) {
        params.push(req.body.APPLICANT_NO);
    }
    const supportKey = req.headers['supportkey'];
    try {
        const results = await db.executeQueryData(q, params, supportKey);
        res.send({
            "code": 200,
            "message": "ok",
            "data": results
        });
    } catch (error) {
        console.log("error", error);
        res.status(400).send({
            "code": 400,
            "message": "Failed to get financial information"
        });
    }
};


exports.create = async (req, res) => {
    let data = reqData(req);
    const q = `insert into financial_information set ?`;
    const supportKey = req.headers['supportkey'];
    try {
        await db.executeQueryData(q, data, supportKey);
        res.send({
            "code": 200,
            "message": "Financial information saved successfully"
        });
    } catch (error) {
        console.log("error", error);
        res.status(400).send({
            "code": 400,
            "message": "Failed to save financial information"
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

    const q = `update financial_information set ${setData} where ID = ?`;
    recData.push(req.body.ID);

    try {
        await db.executeQueryData(q, recData, supportKey);
        res.send({
            "code": 200,
            "message": "Financial information updated successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            "code": 400,
            "message": "Failed to update financial information."
        });
    }
};
