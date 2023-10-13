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

exports.get = (req, res) =>{
    let supportKey = req.headers['supportkey'];
    const q = `select * from facilities where APPLICANT_ID = ${req.body.APPLICANT_ID}`
    db.executeQuery(q, supportKey, (error, results)=>{
        if(error)
        {
            res.send({
                "code": 400,
                "message": "Failed to get facilities details "
            })
        }
        else
        {
            res.send({
                "code": 200,
                "message": "OK",
                "data" : results
            })

        }
    } )

}

exports.create = (req,res) =>{

const supportKey = req.headers['supportkey'] ;   

    const data =  reqData(req);
    const q = `insert into facilities set ?`

    db.executeQueryData(q, data, supportKey, (error)=>{

        if(error)
        {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed to save facilities information"
            })
        }
        else
        {
            res.send({
                "code": 200,
                "message": "facilities information saved successfully"
            })

        }
    })

    

}

exports.update = (req, res) => {
    const supportKey = req.headers['supportkey'] ;   


    const data = reqData(req);
    let setData = '';
    let recData = [];

    Object.keys(data).forEach(key => {
        setData += `${key} = ? ,`;
        recData.push(data[key]);
    });

    setData2 = setData.slice(0,-1);


    const q = `update facilities set ${setData2} where ID = ${req.body.ID}`
    db.executeQueryData(q , recData , supportKey , (error)=>{
        if(error)
        {
            console.log(error);
            res.send({
                "code": 400,
                "message": "Failed to update facilities."
            })

        }
        else
        {
            res.send({
                "code": 200,
                "message": "facilities information updated successfully"
            })

        }

    })


}