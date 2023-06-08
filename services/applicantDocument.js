const db = require('../utilities/dbModule')
const fs = require('fs');
const path = require('path');
const async = require('async');

function reqData(req) {
    data = {
        APPLICANT_ID: req.body.APPLICANT_ID,
        APPLICANT_NO: req.body.APPLICANT_NO,
        DOCUMENT_NAME: req.body.DOCUMENT_NAME,
        FILE_TYPE: req.body.FILE_TYPE,
        IS_APPROVED_CHECKER: req.body.IS_APPROVED_CHECKER,
        CHECKER_REMARK: req.body.CHECKER_REMARK,
        MAKER_REMARK: req.body.MAKER_REMARK,
        VERIFIER_REMARK: req.body.VERIFIER_REMARK,
        IS_APPROVED_CHECKER: req.body.IS_APPROVED_CHECKER,
        IS_APPROVED_VERIFIER: req.body.IS_APPROVED_VERIFIER,
        REFILL_COUNT: req.body.REFILL_COUNT

    }

    return data
}

// exports.get = (req, res) =>{
//     const supportKey = req.headers['supportkey'];
//     let data = reqData(req);

//     db.executeQueryData(`select * from applicant_documents where 1 AND APPLICANT_ID = ?`+ (req.body.APPLICANT_NO ? `APPLICANT_NO = ${req.body.APPLICANT_NO}`: ''), [data.APPLICANT_ID], supportKey, (error, applicantDocumentsRes)=>{
//         if(error)
//         {
//             console.log("error", error);
//             res.send({
//                 "code": 400,
//                 "message": "Failed to get document details."
//             })
//         }
//         else{
//             res.send({
//                 "code": 200,
//                 "message": "ok",
//                 "data": applicantDocumentsRes
//             })
//         }
//     })
// }

exports.getAllApplicants = (req, res) => {
    const supportKey = req.headers['supportkey']
    let resultsArray = [];

    db.executeQueryData(`select * from applicant_documents where APPLICANT_ID = ? AND APPLICANT_NO = ? `, [req.body.APPLICANT_ID, req.body.APPLICANT_NO], supportKey, (error, applicantsDocResult) => {
        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "failed to get applicats document information"
            })

        }
        else {
            console.log("appPhoto", applicantsDocResult);

            if (applicantsDocResult.length > 0) {


                async.eachSeries(applicantsDocResult, function itrateOverAllApplicant(applicant, callback) {
                    if (applicant.FILE_LINK != null && applicant.FILE_LINK != undefined && applicant.FILE_LINK != '') {
                        applicant.IMAGE_DATA = fs.readFileSync(applicant.FILE_LINK, { encoding: "utf-8" });
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
                console.log("applican record doent exist");
                res.send({
                    "code": 200,
                    "data": []
                })
            }

        }
    })
}


exports.create = (req, res) => {
    const supportKey = req.headers['supportkey'];
    let data = reqData(req);


    db.executeQueryData(`insert into applicant_documents set ?`, data , supportKey, (error, documentInsertResult) => {
        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed to insert document details."
            })
        }
        else {
            res.send({
                "code": 200,
                "message": "Document details saved successfully"
            })
        }
    })

}

exports.update = (req, res) => {
    const supportKey = req.headers['supportkey']
    let data = reqData(req);
    let setData = ''
    let recData = []

    Object.keys(data).forEach(key => {
        setData += `${key} = ? ,`;
        recData.push(data[key])
    })

    setData = setData.slice(0, -1);
    db.executeQueryData(`update applicant_documents set ${setData} where ID = ${req.body.ID}`, recData, supportKey, (error) => {
        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed to update applicant information."
            })
        }
        else {
            res.send({
                "code": 200,
                "message": "information saved successful."
            })
        }
    })
}

exports.uploadDocument2 = (req, res) => {
    const supportKey = req.headers['supportkey'];
    let con = db.openConnection();

    db.executeQuery(`select * from applicant_documents where APPLICANT_ID = ${req.body.APPLICANT_ID} AND APPLICANT_NO = ${req.body.APPLICANT_NO}`, supportKey, (error, applicantDocumentRes) => {
        if (error) {
            console.log("error", error);
        }
        else {
            if (applicantDocumentRes.length > 0) {


                // const fileName = genrateRandomKey(32) + '.' + 'jpg'
                const data = req.body.IMAGE_DATA;
                let folderPath = `./uploads/applicantDocuments`;
                let filePath
                for (let i = 0; i < applicantDocumentRes.length - 1; i++) {

                    if (applicantDocumentRes[i].APPLICANT_NO == req.body.APPLICANT_NO) {
                        if (applicantDocumentRes[0].FILE_LINK) {
                            filePath = applicantDocumentRes[0].FILE_LINK
                        }
                        else {
                            filePath = './uploads/applicantDocuments/' + genrateRandomKey(32) + '.' + 'jpg'
                        }
                    }

                }

                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath)

                    fs.writeFile(filePath, data, (err) => {
                        if (err) {
                            console.log("erroe", err);
                            res.send({
                                "code": 400,
                                "message": " failed to upload document"
                            })
                        }
                        else {
                            db.executeDML(`update applicant_documents set FILE_LINK = ? where APPLICANT_ID = ${req.body.APPLICANT_ID} AND APPLICANT_NO = ${req.body.APPLICANT_NO}`, filePath, supportKey, con, (error) => {
                                if (error) {
                                    console.log("error", error);
                                    db.rollbackConnection(con);
                                    res.send({
                                        "code": 400,
                                        "message": "Failed to upload applicant document"
                                    })


                                }
                                else {
                                    db.commitConnection(con);
                                    res.send({
                                        "code": 200,
                                        "message": "document upload successful."
                                    })

                                }
                            })

                        }
                    })
                }
                else {


                    // const fileName = genrateRandomKey(32) + '.' + 'jpg'
                    const data = req.body.IMAGE_DATA;
                    let folderPath = `./uploads/applicantDocuments`;

                    for (let i = 0; i < applicantDocumentRes.length - 1; i++) {

                        if (applicantDocumentRes[i].APPLICANT_NO == req.body.APPLICANT_NO) {
                            if (applicantDocumentRes[0].FILE_LINK) {
                                filePath = applicantDocumentRes[0].FILE_LINK
                            }
                            else {
                                filePath = './uploads/applicantDocuments/' + genrateRandomKey(32) + '.' + 'jpg'
                            }
                        }

                    }
                    fs.writeFile(filePath, data, (err) => {
                        if (err) {
                            console.log("erroe", err);
                            res.send({
                                "code": 400,
                                "message": " failed to upload document"
                            })
                        }
                        else {
                            db.executeDML(`update applicant_documents set FILE_LINK = ? where APPLICANT_ID = ${req.body.APPLICANT_ID} AND APPLICANT_NO = ${req.body.APPLICANT_NO}`, filePath, supportKey, con, (error) => {
                                if (error) {
                                    console.log("error", error);
                                    db.rollbackConnection(con);
                                    res.send({
                                        "code": 400,
                                        "message": "Failed to upload applicant document"
                                    })


                                }
                                else {
                                    db.commitConnection(con);
                                    res.send({
                                        "code": 200,
                                        "message": "document upload successful."
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

exports.uploadDocument = (req, res) => {
    const supportKey = req.headers['supportkey'];
    let con = db.openConnection();

    db.executeQueryData(`select * from applicant_documents where 1 AND ID = ?`, [req.body.ID], supportKey, (error, applicantDocumentRes) => {
        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed to get applicant document details"
            });
        }
        else {
            if (applicantDocumentRes.length > 0) {
                let filePath = '';
                let fileName = '';
                let data = req.body.IMAGE_DATA

                if (applicantDocumentRes[0].FILE_LINK != null && applicantDocumentRes[0].FILE_LINK != undefined && applicantDocumentRes[0].FILE_LINK != '') {
                    filePath = applicantDocumentRes[0].FILE_LINK
                }
                else {
                    filePath = './uploads/applicantDocuments/' + genrateRandomKey(32) + '.' + 'jpg'
                }

                console.log("here is file path found in database", filePath);

                fs.writeFile(filePath, data, { flag: 'w' }, (error) => {
                    if (error) {
                        console.log("error", error);
                        db.rollbackConnection(con)
                        res.send({
                            "code": 400,
                            "message": "Failed to save document"
                        })
                    }
                    else {
                        db.executeQueryData(`update applicant_documents set APPLICANT_ID=?, APPLICANT_NO=?, DOCUMENT_NAME=?, FILE_TYPE=?, FILE_LINK=? where ID = ?`, [req.body.APPLICANT_ID, req.body.APPLICANT_NO, req.body.DOCUMENT_NAME, req.body.FILE_TYPE, filePath, req.body.ID], supportKey, (error, documentInsertResult) => {
                            if (error) {
                                console.log("error", error);
                                res.send({
                                    "code": 400,
                                    "message": "Failed to update document details."
                                })
                            }
                            else {
                                res.send({
                                    "code": 200,
                                    "message": "Document details saved successfully"
                                })
                            }
                        })

                    }


                })

            }
            else {
                res.send({
                    "code": 404,
                    "message": "Unable to find document"
                })
            }
        }
    })

}


function genrateRandomKey(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$-#@&';
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;


}

