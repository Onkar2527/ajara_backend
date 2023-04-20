const db = require('../utilities/dbModule')

function reqData(req) {
    let data = {

        APPLICANT_ID : req.body.APPLICANT_ID,
        APPLICANT_NO : req.body.APPLICANT_NO,
        NAME_OF_BANK : req.body.NAME_OF_BANK,
        NAME_OF_BANK2: req.body.NAME_OF_BANK2,
        NAME_OF_BANK3: req.body.NAME_OF_BANK3,
        NAME_OF_BANK4: req.body.NAME_OF_BANK4,
        BRANCH_NAME: req.body.BRANCH_NAME,
        BRANCH_NAME2: req.body.BRANCH_NAME2,
        ACCOUNT_NO: req.body.ACCOUNT_NO,
        ACCOUNT_NO2: req.body.ACCOUNT_NO2,
        DEBIT_CARD: req.body.DEBIT_CARD,
        DEBIT_CARD2: req.body.DEBIT_CARD2

    }

    return data;
}




exports.get = (req, res) => {
    let supportKey = req.headers['supportkey'];
    const q = `select * from other_bank_account where APPLICANT_ID = ${req.body.APPLICANT_ID}` + (req.body.APPLICANT_NO ? ' AND APPLICANT_NO = '+ req.body.APPLICANT_NO : '' )
    db.executeQuery(q, supportKey, (error, results) => {
        if (error) {
            res.send({
                "code": 400,
                "message": "Failed to get other bank account information"
            })
        }
        else {
            res.send({
                "code": 200,
                "message": "OK",
                "data": results
            })

        }
    })

}

exports.create = (req, res) => {
    const supportKey = req.headers['supportkey'];


    const data = reqData(req);
    const q = `insert into other_bank_account set ?`

    db.executeQueryData(q, data, supportKey, (error) => {

        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed to save other bank account information"
            })
        }
        else {
            res.send({
                "code": 200,
                "message": "other bank account saved successfully"
            })

        }
    })



}

exports.update = (req, res) => {
    const supportKey = req.headers['supportkey'];


    const data = reqData(req);
    let setData = '';
    let recData = [];

    Object.keys(data).forEach(key => {
        setData += `${key} = ? ,`;
        recData.push(data[key]);
    });

    setData2 = setData.slice(0, -1);


    const q = `update other_bank_account set ${setData2} where ID = ${req.body.ID}`
    db.executeQueryData(q, recData, supportKey, (error) => {
        if (error) {
            console.log(error);
            res.send({
                "code": 400,
                "message": "Failed to update other bank account information"
            })

        }
        else {
            res.send({
                "code": 200,
                "message": " other bank account information updated successfully"
            })

        }

    })


}