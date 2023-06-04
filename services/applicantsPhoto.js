const db = require('../utilities/dbModule')
const fs = require('fs');
const path = require('path');
const async = require('async');

const IncomingForm = require('formidable').IncomingForm;




exports.get = (req, res) => {

    console.log("reqbody", req.body);
    let supportKey = req.headers['supportkey'];
    const q = `select * from applicant_photos where APPLICANT_ID = ${req.body.APPLICANT_ID} ` + (req.body.APPLICANT_NO ? 'AND APPLICANT_NO = ' + req.body.APPLICANT_NO : '')
    db.executeQuery(q, supportKey, (error, results) => {
        if (error) {
            console.log("Error", error);
            res.send({
                "code": 400,
                "message": "Failed to get applicant photos informmation "
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

exports.getAllApplicants = (req, res) => {
    const supportKey = req.headers['supportkey']
    let resultsArray = [];

    db.executeQuery(`select * from applicant_photos where APPLICANT_ID = ${req.body.APPLICANT_ID}`, supportKey, (error, applicantsPhotoResult,) => {
        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "failed to get applicats photos information"
            })

        }
        else {
            console.log("appPhoto", applicantsPhotoResult);

            if (applicantsPhotoResult.length > 0) {

                async.eachSeries(applicantsPhotoResult, function itrateOverAllApplicant(applicant, callback) {
                    if (applicant.IMAGE_LINK != null && applicant.IMAGE_LINK != undefined && applicant.IMAGE_LINK != '') {
                        applicant.IMAGE_DATA = fs.readFileSync(applicant.IMAGE_LINK, { encoding: "utf-8" });
                        resultsArray.push(applicant)
                        callback();
                    }
                    else {
                        resultsArray.push(applicant)
                        callback()
                    }
                },
                    function resultFunction(error) {
                        if (error) {
                            console.log("error async", error);
                        }
                        else {
                            res.send({
                                "code": 200,
                                "data": resultsArray
                            })
                        }


                    })


            }
            else {
                console.log("applican doent exist");

            }

        }
    })
}



exports.upload = (req, res) => {
    const supportKey = req.headers['supportkey'];
    let con = db.openConnection();

    db.executeQuery(`select * from applicant_photos where APPLICANT_ID = ${req.body.APPLICANT_ID} AND APPLICANT_NO = ${req.body.APPLICANT_NO}`, supportKey, (error, applicantPhotoRes) => {
        if (error) {
            console.log("error", error);
        }
        else {
            if (applicantPhotoRes.length > 0) {

                const folderName = 'APPLICANT_ID-' + req.body.APPLICANT_ID;
                const fileName = 'APPLICANT_NO-' + req.body.APPLICANT_NO + '.' + 'jpg'
                const data = req.body.IMAGE_DATA;
                let folderPath = `./uploads/${folderName}`;
                let filePath = folderPath + '/' + fileName;

                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath)

                    fs.writeFile(filePath, data, (err) => {
                        if (err) {
                            console.log("erroe", err);
                            res.send({
                                "code": 400,
                                "message": " failed to upload photo"
                            })
                        }
                        else {
                            db.executeDML(`update applicant_photos set IMAGE_LINK = ? where APPLICANT_ID = ${req.body.APPLICANT_ID} AND APPLICANT_NO = ${req.body.APPLICANT_NO}`, filePath, supportKey, con, (error) => {
                                if (error) {
                                    console.log("error", error);
                                    db.rollbackConnection(con);
                                    res.send({
                                        "code": 400,
                                        "message": "Failed to upload applicant photo"
                                    })


                                }
                                else {
                                    db.commitConnection(con);
                                    res.send({
                                        "code": 200,
                                        "message": "Photo upload successful."
                                    })

                                }
                            })

                        }
                    })
                }
                else {

                    const folderName = 'APPLICANT_ID-' + req.body.APPLICANT_ID;
                    const fileName = 'APPLICANT_NO-' + req.body.APPLICANT_NO + '.' + 'jpg'
                    const data = req.body.IMAGE_DATA;
                    let folderPath = `./uploads/${folderName}`;
                    let filePath = folderPath + '/' + fileName;


                    fs.writeFile(filePath, data, (err) => {
                        if (err) {
                            console.log("erroe", err);
                            res.send({
                                "code": 400,
                                "message": " failed to upload photo"
                            })
                        }
                        else {
                            db.executeDML(`update applicant_photos set IMAGE_LINK = ? where APPLICANT_ID = ${req.body.APPLICANT_ID} AND APPLICANT_NO = ${req.body.APPLICANT_NO}`, filePath, supportKey, con, (error) => {
                                if (error) {
                                    console.log("error", error);
                                    db.rollbackConnection(con);
                                    res.send({
                                        "code": 400,
                                        "message": "Failed to upload applicant photo"
                                    })


                                }
                                else {
                                    db.commitConnection(con);
                                    res.send({
                                        "code": 200,
                                        "message": "Photo upload successful."
                                    })

                                }
                            })
                        }
                    })

                }
            }
            else {

                res.send({
                    "code": 400,
                    "message": "Applicant does not exist "
                })


            }

        }

    })


}

exports.retrieve = (req, res) => {

    const supportKey = req.headers['supportkey'];

    db.executeQuery(`select * from applicant_photos where APPLICANT_ID = ${req.body.APPLICANT_ID} AND APPLICANT_NO = ${req.body.APPLICANT_NO}`, supportKey, (error, applicantPhotoResult) => {
        if (error) {
            console.log(error);
            // res.send({"error": error})

        }
        else {

            const IMAGE_DATA = fs.readFileSync(applicantPhotoResult[0].IMAGE_LINK, { encoding: "base64" })
            
            res.send({

                "code": 200,
                "message": "ok",
                "data": IMAGE_DATA
            })
        }
    })



}