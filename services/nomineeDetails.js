const db = require('../utilities/dbModule');



function reqData(req) {
    let data = {
        APPLICANT_ID: req.body.APPLICANT_ID,
        IS_MINOR: req.body.IS_MINOR,
        DOB: req.body.DOB,
        NOMINEE_NAME: req.body.NOMINEE_NAME,
        RELATION: req.body.RELATION,
        NOMINEE_ADDRESS: req.body.NOMINEE_ADDRESS,
        APONITED_NAME: req.body.APONITED_NAME,
        APONITED_ADDRESS: req.body.APONITED_ADDRESS,
        NOMINEE_MIDDLE_NAME: req.body.NOMINEE_MIDDLE_NAME,
        NOMINEE_LAST_NAME: req.body.NOMINEE_LAST_NAME,
        NOMINEE_DOB: req.body.NOMINEE_DOB,
        NOMINEE_AGE: req.body.NOMINEE_AGE,
        SHARE_PERCENTAGE: req.body.SHARE_PERCENTAGE,
        NOMINATION_TYPE: req.body.NOMINATION_TYPE

    }

    return data;
}

exports.get = async (req, res) => {
    const supportKey = req.headers['supportkey'];
    const q = `select * from nominee_details where APPLICANT_ID = ?`;
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
            "message": "Failed to get Nominee Details"
        });
    }
};

exports.create = async (req, res) => {
    const supportKey = req.headers['supportkey'];
    const data = reqData(req);
    const q = `insert into nominee_details set ?`;

    try {
        console.log("Creating Nominee:", data);
        await db.executeQueryData(q, data, supportKey);
        res.send({
            "code": 200,
            "message": "Nominee Details information saved successfully"
        });
    } catch (error) {
        console.log("error", error);
        res.status(400).send({
            "code": 400,
            "message": "Failed to save Nominee Details information"
        });
    }
};

exports.update = async (req, res) => {
    const supportKey = req.headers['supportkey'];
    const data = reqData(req);
    let setData = [];
    let recData = [];

    Object.keys(data).forEach(key => {
        setData.push(`${key} = ?`);
        recData.push(data[key]);
    });

    const q = `update nominee_details set ${setData.join(', ')} where ID = ?`;
    recData.push(req.body.ID);

    try {
        console.log("Updating Nominee (ID: " + req.body.ID + "):", data);
        await db.executeQueryData(q, recData, supportKey);
        res.send({
            "code": 200,
            "message": "Nominee details information updated successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            "code": 400,
            "message": "Failed to update nominee_details."
        });
    }
};


exports.delete = async (req, res) => {
    const supportKey = req.headers['supportkey'];
    const q = `delete from nominee_details where ID = ?`;
    try {
        await db.executeQueryData(q, [req.body.ID], supportKey);
        res.send({
            "code": 200,
            "message": "Nominee details deleted successfully"
        });
    } catch (error) {
        console.log("error", error);
        res.status(400).send({
            "code": 400,
            "message": "Failed to delete Nominee Details"
        });
    }
};
