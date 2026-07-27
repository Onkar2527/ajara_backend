const db = require('../utilities/dbModule');

let remark_table = 'remark_master';

function getData(req) {
    let data = {
        REMARK: req.body.REMARK,
        USER_ID: req.body.USER_ID,
        REMARK_DATE: req.body.REMARK_DATE,
        APPLICANT_ID: req.body.APPLICANT_ID,
        USER_NAME: req.body.USER_NAME,
        ROLE: req.body.ROLE
    }

    return data;
}

exports.createRemark = async (req, res) => {
    try {
        let data = getData(req);
        const supportKey = req.headers['supportkey'];

        let q = `insert into ${remark_table} set ?`

        await db.executeQueryData(q, data, supportKey);

        res.send({
            "code": 200,
            "message": "Remark created"
        })
    }
    catch (error) {
        console.log(error);
        res.send({
            "code": 400,
            "message": "Failed to create remark"
        })
    }

}

exports.getAllRemark = async (req, res) => {

    try {
        const supportKey = req.headers['supportkey'];
        let APPLICANT_ID = req.body.APPLICANT_ID;

        let q = `select * from ${remark_table} where APPLICANT_ID = ?`;
        let result = await db.executeQueryData(q, [APPLICANT_ID], supportKey);

        res.send({
            "code": 200,
            "data": result
        })
    }
    catch (error) {
        console.log(error)
        res.send({
            "code": 400,
            "message": "Failed to get remark"
        })
    }


}
