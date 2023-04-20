const db = require('../utilities/dbModule')

function reqData(req) {

    let data = {


        APPLICANT_ID: req.body.APPLICANT_ID,
        APPLICANT_NO: req.body.APPLICANT_NO,
        IS_VEHICLE_LOAN: req.body.IS_VEHICLE_LOAN,
        IS_HOME_LOAN: req.body.IS_HOME_LOAN,
        IS_CONSUMER_LOAN: req.body.IS_CONSUMER_LOAN,
        IS_BUSINESS_LOAN: req.body.IS_BUSINESS_LOAN,
        IS_INSURANCE_LOAN: req.body.IS_INSURANCE_LOAN,
        IS_TOUR_LOAN: req.body.IS_TOUR_LOAN,
        IS_EDUCATION_LOAN: req.body.IS_EDUCATION_LOAN,
        IS_VEHICLE_LOAN_YEAR: req.body.IS_VEHICLE_LOAN_YEAR,
        IS_HOME_LOAN_YEAR: req.body.IS_HOME_LOAN_YEAR,
        IS_CONSUMER_LOAN_YEAR: req.body.IS_CONSUMER_LOAN_YEAR,
        IS_BUSINESS_LOAN_YEAR: req.body.IS_BUSINESS_LOAN_YEAR,
        IS_INSURANCE_LOAN_YEAR: req.body.IS_INSURANCE_LOAN_YEAR,
        IS_TOUR_LOAN_YEAR: req.body.IS_TOUR_LOAN_YEAR,
        IS_EDUCATION_LOAN_YEAR: req.body.IS_EDUCATION_LOAN_YEAR,
        IS_VEHICLE_LOAN_REQUIRED: req.body.IS_VEHICLE_LOAN_REQUIRED,
        IS_HOME_LOAN_REQUIRED: req.body.IS_HOME_LOAN_REQUIRED,
        IS_CONSUMER_LOAN_REQUIRED: req.body.IS_CONSUMER_LOAN_REQUIRED,
        IS_BUSINESS_LOAN_REQUIRED: req.body.IS_BUSINESS_LOAN_REQUIRED,
        IS_INSURANCE_LOAN_REQUIRED: req.body.IS_BUSINESS_LOAN_REQUIRED,
        IS_TOUR_LOAN_REQUIRED: req.body.IS_TOUR_LOAN_REQUIRED,
        IS_EDUCATION_LOAN_REQUIRED: req.body.IS_EDUCATION_LOAN_REQUIRED

    }

    return data;
}


exports.get = (req, res) =>{
    let supportKey = req.headers['supportkey'];
    const q = `select * from loan_information where APPLICANT_ID = ${req.body.APPLICANT_ID}` + (req.body.APPLICANT_NO ? ' AND APPLICANT_NO = '+ req.body.APPLICANT_NO : '')
    db.executeQuery(q, supportKey, (error, results)=>{
        if(error)
        {
            res.send({
                "code": 400,
                "message": "Failed to get loan information"
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
    const q = `insert into loan_information set ?`

    db.executeQueryData(q, data, supportKey, (error)=>{

        if(error)
        {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed to save loan information"
            })
        }
        else
        {
            res.send({
                "code": 200,
                "message": "Loan information saved successfully"
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


    const q = `update loan_information set ${setData2} where ID = ${req.body.ID}`
    db.executeQueryData(q , recData , supportKey , (error)=>{
        if(error)
        {
            console.log(error);
            res.send({
                "code": 400,
                "message": "Failed to update loan information"
            })

        }
        else
        {
            res.send({
                "code": 200,
                "message": "loan information updated successfully"
            })

        }

    })


}