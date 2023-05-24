const db = require('../utilities/dbModule');

function reqData(req) {



    // var data = { //personal info table 
    //     ID: req.body.ID,
    //     APPLICANT_ID: req.body.APPLICANT_ID,
    //     FIRST_NAME: req.body.FIRST_NAME,
    //     MIDDLE_NAME: req.body.MIDDLE_NAME,
    //     LAST_NAME: req.body.LAST_NAME,
    //     FATHER_OR_HUSBAND_NAME: req.body.FATHER_OR_HUSBAND_NAME,
    //     CURRENT_ADDRESS: req.body.CURRENT_ADDRESS,
    //     CURRENT_CITY: req.body.CURRENT_CITY,
    //     CURRENT_TALUKA: req.body.CURRENT_TALUKA,
    //     CURRENT_DISTRICT: req.body.CURRENT_DISTRICT,
    //     CURRENT_LANDMARK: req.body.CURRENT_LANDMARK,
    //     CURRENT_STATE: req.body.CURRENT_STATE,
    //     CURRENT_PINCODE: req.body.CURRENT_PINCODE,
    //     PERMANENT_ADDRESS: req.body.PERMANENT_ADDRESS,
    //     PERMANENT_CITY: req.body.PERMANENT_CITY,
    //     PERMANENT_TALUKA: req.body.PERMANENT_TALUKA,
    //     PERMANENT_DISTRICT: req.body.PERMANENT_DISTRICT,
    //     PERMANENT_LANDMARK: req.body.PERMANENT_LANDMARK,
    //     PERMANENT_STATE: req.body.PERMANENT_STATE,
    //     PERMANENT_PINCODE: req.body.PERMANENT_PINCODE,
    //     HOUSE_PHONE: req.body.HOUSE_PHONE,
    //     OFFICE_PHONE: req.body.OFFICE_PHONE,
    //     EMAIL_ID: req.body.EMAIL_ID,
    //     MOBILE_NUMBER: req.body.MOBILE_NUMBER,
    //     WORK: req.body.WORK,
    //     ESTABLISHMENT: req.body.ESTABLISHMENT,
    //     RELIGION: req.body.RELIGION,
    //     CAST: req.body.CAST,
    //     MARITAL_STATUS: req.body.MARITAL_STATUS,
    //     FAMILY_COUNT: req.body.FAMILY_COUNT,
    //     EDUCATION: req.body.EDUCATION,
    //     IS_INSURED: req.body.IS_INSURED,
    //     INSURANCE_YEAR: req.body.INSURANCE_YEAR,
    //     POLICY_TYPE: req.body.POLICY_TYPE,

    //     INSURANCE_COMPANY: req.body.INSURANCE_COMPANY,
    //     AADHAAR_NUMBER: req.body.AADHAAR_NUMBER,
    //     BLOOD_TYPE: req.body.BLOOD_TYPE,
    //     EMPLOYMENT_DETAIL: req.body.EMPLOYMENT_DETAIL,
    //     EMPLOYMENT_DESIGNATION: req.body.EMPLOYMENT_DESIGNATION,
    //     SELF_EMPLOYMENT_DETAIL: req.body.SELF_EMPLOYMENT_DETAIL,
    //     BUSINESS_DETAIL: req.body.BUSINESS_DETAIL
    // };

    var data = {

        NO_OF_APPLICANT: req.body.NO_OF_APPLICANT,
        ACCOUNT_TYPE: req.body.ACCOUNT_TYPE,
        ACCOUNT_OPERATION: req.body.ACCOUNT_OPERATION,
        AADHAAR_NUMBER: req.body.AADHAAR_NUMBER,
        PAN_NUMBER: req.body.PAN_NUMBER,
        AADHAAR_NUMBER2: req.body.AADHAAR_NUMBER2,
        PAN_NUMBER2: req.body.PAN_NUMBER2,
        AADHAAR_NUMBER3: req.body.AADHAAR_NUMBER3,
        PAN_NUMBER3: req.body.PAN_NUMBER3,
        AADHAAR_NUMBER4: req.body.AADHAAR_NUMBER4,
        PAN_NUMBER4: req.body.PAN_NUMBER4,
        PRIMARY_APPLICANT_FIRST_NAME: req.body.PRIMARY_APPLICANT_FIRST_NAME,
        PRIMARY_APPLICANT_MIDDLE_NAME: req.body.PRIMARY_APPLICANT_MIDDLE_NAME,
        PRIMARY_APPLICANT_LAST_NAME: req.body.PRIMARY_APPLICANT_LAST_NAME,
        APPLICANT2_FIRST_NAME: req.body.APPLICANT2_FIRST_NAME,
        APPLICANT2_MIDDLE_NAME: req.body.APPLICANT2_MIDDLE_NAME,
        APPLICANT2_LAST_NAME: req.body.APPLICANT2_LAST_NAME,
        APPLICANT3_FIRST_NAME: req.body.APPLICANT3_FIRST_NAME,
        APPLICANT3_MIDDLE_NAME: req.body.APPLICANT3_MIDDLE_NAME,
        APPLICANT3_LAST_NAME: req.body.APPLICANT3_LAST_NAME,
        APPLICANT4_FIRST_NAME: req.body.APPLICANT4_FIRST_NAME,
        APPLICANT4_MIDDLE_NAME: req.body.APPLICANT4_MIDDLE_NAME,
        APPLICANT4_LAST_NAME: req.body.APPLICANT4_LAST_NAME,
        IS_MINOR: req.body.IS_MINOR,
        MINOR_DOB: req.body.MINOR_DOB,
        GUARDIAN_NAME: req.body.GUARDIAN_NAME,
        RELATION_WITH_MINOR: req.body.RELATION_WITH_MINOR,
        GUARDIAN_DOB: req.body.GUARDIAN_DOB,
        IS_INTRODUCED: req.body.IS_INTRODUCED,
        E_CUSTOMER_NAME: req.body.E_CUSTOMER_NAME,
        E_CUSTOMER_ID: req.body.E_CUSTOMER_ID,
        E_ACCOUNT_NUMBER: req.body.E_ACCOUNT_NUMBER,
        E_YEARS: req.body.E_YEARS,
        STATUS: req.body.STATUS

    }

    return data;

} 

function getAllApplicantsInfo(req) {
    var data1 = [];
    let counter = req.body.NO_OF_APPLICANT;

    var data = {
        APPLICANT1: { FIRST_NAME: req.body.PRIMARY_APPLICANT_FIRST_NAME, APPLICANT_NO: 1, MIDDLE_NAME: req.body.PRIMARY_APPLICANT_MIDDLE_NAME, LAST_NAME: req.body.PRIMARY_APPLICANT_LAST_NAME, AADHAAR_NUMBER: req.body.AADHAAR_NUMBER },
        APPLICANT2: { FIRST_NAME: req.body.APPLICANT2_FIRST_NAME, APPLICANT_NO: 2, MIDDLE_NAME: req.body.APPLICANT2_MIDDLE_NAME, LAST_NAME: req.body.APPLICANT2_LAST_NAME, AADHAAR_NUMBER: req.body.AADHAAR_NUMBER2 },
        APPLICANT3: { FIRST_NAME: req.body.APPLICANT3_FIRST_NAME, APPLICANT_NO: 3, MIDDLE_NAME: req.body.APPLICANT3_MIDDLE_NAME, LAST_NAME: req.body.APPLICANT3_LAST_NAME, AADHAAR_NUMBER: req.body.AADHAAR_NUMBER3 },
        APPLICANT4: { FIRST_NAME: req.body.APPLICANT4_FIRST_NAME, APPLICANT_NO: 4, MIDDLE_NAME: req.body.APPLICANT4_MIDDLE_NAME, LAST_NAME: req.body.APPLICANT4_LAST_NAME, AADHAAR_NUMBER: req.body.AADHAAR_NUMBER3 }
    }
    Object.keys(data).forEach(key => {

        if (counter > 0) {
            data1.push(data[key])
        }

        counter = counter - 1;
    })



    return data1
}

exports.get = (req, res) => {

    let supportKey = req.headers['supportkey'];
    const q = `select * from basic_details where ID = ${req.body.ID}`
    db.executeQuery(q, supportKey, (error, results) => {
        if (error) {
            console.log("Error", error);
            res.send({
                "code": 400,
                "message": "Failed to get personal details "
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
    console.error(req.method + ' / ' + req.hostname + req.originalUrl);

    let data = reqData(req);
    let allApplicants = getAllApplicantsInfo(req)
    let supportKey = req.headers['supportkey'];

    let con = db.openConnection();

    console.log("data", data);
    console.log("applicants", allApplicants);
    const q = `insert into basic_details set ?`

    db.executeDML(q, data, supportKey, con, (error, basicDetailResult) => {
        if (error) {
            console.log("error", error);
            db.rollbackConnection(con)
            callback(error);
        }
        else {
            let async = require('async')


            async.eachSeries(allApplicants, function itrateOverApplicant(applicant, callback) {

                db.executeDML(`insert into applicant_photos set ? `, { APPLICANT_ID: basicDetailResult.insertId, APPLICANT_NO: applicant.APPLICANT_NO, FIRST_NAME: applicant.FIRST_NAME, MIDDLE_NAME: applicant.MIDDLE_NAME, LAST_NAME: applicant.LAST_NAME }, supportKey, con, (error, applicantPhotoResult) => {
                    if (error) {
                        console.log("error", error);
                        db.rollbackConnection(con);
                        callback(error);
                    }
                    else {
                        console.log("reslt", basicDetailResult);
                        db.executeDML('insert into applicants_personal_details set ? ', { APPLICANT_ID: basicDetailResult.insertId, APPLICANT_NO: applicant.APPLICANT_NO, FIRST_NAME: applicant.FIRST_NAME, MIDDLE_NAME: applicant.MIDDLE_NAME, LAST_NAME: applicant.LAST_NAME, AADHAAR_NUMBER: applicant.AADHAAR_NUMBER }, supportKey, con, (error, persoanlDetailsResult) => {
                            if (error) {
                                console.log("error", error);
                                db.rollbackConnection(con);
                                callback(error)
                            }
                            else {
                                console.log("application created successful .............");
                                callback();
                            }
                        })
                    }

                })
            },
                function resultFunction(error) {
                    if (error) {
                        res.send({
                            "code": 400,
                            "message": "Failed to save basic details"
                        })
                    }
                    else {
                        db.commitConnection(con)
                        res.send({
                            "code": 200,
                            "message": "Basic details saved successfully",
                            "APPLICANT_ID": basicDetailResult.insertId
                        })
                    }
                })
        }
    })
}


exports.update1 = (req, res) => {
    const supportKey = req.headers['supportkey'];
    let con = db.openConnection();
    let allApplicants = getAllApplicantsInfo(req)


    const data = reqData(req);
    let setData = '';
    let recData = [];

    Object.keys(data).forEach(key => {
        setData += `${key} = ? ,`;
        recData.push(data[key]);
    });

    setData2 = setData.slice(0, -1);

    console.log("dtttt ", setData2);

    const q = `update basic_details set ${setData2} where ID = ${req.body.ID}`
    db.executeDML(q, recData, supportKey, con, (error) => {
        if (error) {
            console.log(error);
            db.rollbackConnection(con)
            res.send({
                "code": 400,
                "message": "Failed to update personal_information."
            })

        }
        else {

            let async = require('async')
            let applicantsPersonalfeilds = '';
            let applicantsPersonalArray = [];
            let counter = 1;

            async.eachSeries(allApplicants, function itrateOverAllApplicant(applicant, callback) {


                Object.keys(applicant).forEach(key => {
                    applicantsPersonalfeilds += `${key} = ? ,`;
                    applicantsPersonalArray.push(applicant[key]);
                });

                applicantsPersonalfeilds = applicantsPersonalfeilds.slice(0, -1)

                const q = `update applicants_personal_details set ${applicantsPersonalfeilds} where APPLICANT_ID = ${req.body.ID} AND APPLICANT_NO = ${counter}`

                db.executeDML(q, applicantsPersonalArray, supportKey, con, (error) => {
                    if (error) {
                        console.log("error in personal info update through bsicdetails ", error);
                        db.rollbackConnection(con);
                        callback(error);
                    }
                    else {
                        console.log("applicant :  - ", applicant);
                        counter += 1;
                        callback();
                    }
                })
            },
                function resultFunction(error) {
                    if (error) {
                        console.log("error", error);
                        res.send({
                            "code": 400,
                            "message": "Failed to update basic information"

                        })
                    }
                    else {
                        res.send({
                            "code": 200,
                            "message": "bascic details update successfully"
                        })
                    }

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
        setData += `${key} = ?,`;
        recData.push(data[key]);
    });

    setData2 = setData.slice(0, -1)

    const q = `update basic_details set ${setData2} where ID = ${req.body.ID}`
    db.executeQueryData(q, recData, supportKey, (error) => {
        if (error) {
            console.log(error);
            res.send({
                "code": 400,
                "message": "Failed to update basic form details"
            })

        }
        else
        {
            res.send({
                "code": 200,
                "message": "basic details updated successfully"
            })

        }

    })


}