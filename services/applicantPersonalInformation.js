const db = require('../utilities/dbModule')

function reqData(req) {

    let data = {


        APPLICANT_ID: req.body.APPLICANT_ID,
        FIRST_NAME: req.body.FIRST_NAME,
        MIDDLE_NAME: req.body.MIDDLE_NAME,
        LAST_NAME: req.body.LAST_NAME,
        F_OR_H_FIRST_NAME: req.body.F_OR_H_FIRST_NAME,
        F_OR_H_MIDDLE_NAME: req.body.F_OR_H_MIDDLE_NAME,
        F_OR_H_LAST_NAME: req.body.F_OR_H_LAST_NAME,
        CURRENT_ADDRESS: req.body.CURRENT_ADDRESS,
        CURRENT_CITY: req.body.CURRENT_CITY,
        CURRENT_TALUKA: req.body.CURRENT_TALUKA,
        CURRENT_DISTRICT: req.body.CURRENT_DISTRICT,
        CURRENT_LANDMARK: req.body.CURRENT_LANDMARK,
        CURRENT_STATE: req.body.CURRENT_STATE,
        CURRENT_PINCODE: req.body.CURRENT_PINCODE,
        PERMANENT_ADDRESS: req.body.PERMANENT_ADDRESS,
        PERMANENT_CITY: req.body.PERMANENT_CITY,
        PERMANENT_TALUKA: req.body.PERMANENT_TALUKA,
        PERMANENT_DISTRICT: req.body.PERMANENT_DISTRICT,
        PERMANENT_LANDMARK: req.body.PERMANENT_LANDMARK,
        PERMANENT_STATE: req.body.PERMANENT_STATE,
        PERMANENT_PINCODE: req.body.PERMANENT_PINCODE,
        HOUSE_PHONE: req.body.HOUSE_PHONE,
        OFFICE_PHONE: req.body.OFFICE_PHONE,
        EMAIL_ID: string = req.body.EMAIL_ID,
        MOBILE_NUMBER: req.body.MOBILE_NUMBER,
        WORK: req.body.WORK,
        ESTABLISHMENT: req.body.ESTABLISHMENT,
        RELIGION: req.body.RELIGION,
        CAST: req.body.CAST,
        MARITAL_STATUS: req.body.MARITAL_STATUS,
        FAMILY_COUNT: req.body.FAMILY_COUNT,
        EDUCATION: req.body.EDUCATION,
        IS_INSURED: req.body.IS_INSURED ? 1 : 0,
        INSURANCE_YEAR: req.body.INSURANCE_COMPANY,
        POLICY_TYPE: req.body.POLICY_TYPE,
        INSURANCE_COMPANY: req.body.INSURANCE_COMPANY,
        AADHAAR_NUMBER: req.body.AADHAAR_NUMBER,
        BLOOD_TYPE: req.body.BLOOD_TYPE,
        BLOOD_TYPE_SIGN: req.body.BLOOD_TYPE_SIGN,
        EMPLOYMENT_DETAIL: req.body.EMPLOYMENT_DETAIL,
        EMPLOYMENT_DESIGNATION: req.body.EMPLOYMENT_DESIGNATION,
        SELF_EMPLOYMENT_DETAIL: req.body.SELF_EMPLOYMENT_DETAIL,
        BUSINESS_DETAIL: req.body.BUSINESS_DETAIL,
        PROPRIETOR_DETAILS: req.body.PROPRIETOR_DETAILS,
        MOTHERS_NAME : req.body.MOTHERS_NAME,
        PAN_NO : req.body.PAN_NO,
        MOTHERS_MAIDEN_NAME : req.body.MOTHERS_MAIDEN_NAME,
        NATIONALITY : req.body.NATIONALITY,
        DATE_OF_BIRTH : req.body.DATE_OF_BIRTH,
        GENDER : req.body.GENDER

    }

    return data;
}

exports.get = (req, res) => {

    let supportKey = req.headers['supportkey'];
    const q = `select * from applicants_personal_details where APPLICANT_ID = ${req.body.APPLICANT_ID}` + (req.body.APPLICANT_NO ? 'AND APPLICANT_NO = ' + req.body.APPLICANT_NO : '');
    console.log("query", q);
    db.executeQuery(q, supportKey, (error, results) => {
        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed to get applicants personal information"
            })
        }
        else {
            console.log("result personal", results);
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
    const q = `insert into applicants_persoanl_details set ?`

    db.executeQueryData(q, data, supportKey, (error) => {

        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed to save applicants personal information"
            })
        }
        else {
            res.send({
                "code": 200,
                "message": "Appliction personal information saved successfully"
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


    const q = `update applicants_personal_details set ${setData2} where ID = ${req.body.ID}`

    db.executeQueryData(q, recData, supportKey, (error) => {
        if (error) {
            console.log(error);
            res.send({
                "code": 400,
                "message": "Failed to update applicants personal_information"
            })

        }
        else {
            res.send({
                "code": 200,
                "message": "applicants personal information updated successfully"
            })

        }

    })


}