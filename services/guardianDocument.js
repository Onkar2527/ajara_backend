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
        CHECKER_REMARK: req.body.CHECKER_REMARK,
        MAKER_REMARK: req.body.MAKER_REMARK,
        VERIFIER_REMARK: req.body.VERIFIER_REMARK,
        IS_APPROVED_CHECKER: req.body.IS_APPROVED_CHECKER ? 1 : 0,
        IS_APPROVED_VERIFIER: req.body.IS_APPROVED_VERIFIER ? 1 : 0,
        REFILL_COUNT: req.body.REFILL_COUNT

    }

    return data
}

// exports.get = (req, res) =>{
//     const supportKey = req.headers['supportkey'];
//     let data = reqData(req);

//     db.executeQueryData(`select * from guardian_documents where 1 AND guardian_ID = ?`+ (req.body.guardian_NO ? `guardian_NO = ${req.body.guardian_NO}`: ''), [data.guardian_ID], supportKey, (error, guardianDocumentsRes)=>{
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
//                 "data": guardianDocumentsRes
//             })
//         }
//     })
// }

exports.getAllguardians = (req, res) => {
    const supportKey = req.headers['supportkey']
    let resultsArray = [];

    db.executeQueryData(`select * from guardian_documents where APPLICANT_ID = ? ` + (req.body.APPLICANT_NO ? `AND APPLICANT_NO = ? ` : ``), [req.body.APPLICANT_ID, req.body.APPLICANT_NO], supportKey, (error, guardiansDocResult) => {
        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "failed to get applicats document information"
            })

        }
        else {
            console.log("appPhoto", guardiansDocResult);

            if (guardiansDocResult.length > 0) {


                async.eachSeries(guardiansDocResult, function itrateOverAllguardian(guardian, callback) {
                    if (guardian.FILE_LINK != null && guardian.FILE_LINK != undefined && guardian.FILE_LINK != '') {
                        try {
                            guardian.IMAGE_DATA = fs.readFileSync(guardian.FILE_LINK, { encoding: "utf-8" });
                        }
                        catch (error) {
                            console.log(error);
                            guardian.IMAGE_DATA = ""
                        }

                        resultsArray.push(guardian)
                        callback();
                    }
                    else {
                        resultsArray.push(guardian)
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


    db.executeQueryData(`insert into guardian_documents set ?`, data, supportKey, (error, documentInsertResult) => {
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
    db.executeQueryData(`update guardian_documents set ${setData} where ID = ${req.body.ID}`, recData, supportKey, (error) => {
        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed to update guardian information."
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



exports.uploadDocument = (req, res) => {
    const supportKey = req.headers['supportkey'];
    let con = db.openConnection();

    db.executeQueryData(`select * from guardian_documents where 1 AND ID = ?`, [req.body.ID], supportKey, (error, guardianDocumentRes) => {
        if (error) {
            console.log("error1", error);
            res.send({
                "code": 400,
                "message": "Failed to get guardian document details"
            });
        }
        else {
            if (guardianDocumentRes.length > 0) {
                let filePath = '';
                let fileName = '';
                let data = req.body.IMAGE_DATA

                if (guardianDocumentRes[0].FILE_LINK != null && guardianDocumentRes[0].FILE_LINK != undefined && guardianDocumentRes[0].FILE_LINK != '') {
                    filePath = guardianDocumentRes[0].FILE_LINK
                    console.log("is it here ?",filePath );
                    
                }
                else {
                    filePath = './uploads/guardianDocuments/' + genrateRandomKey(32) + '.' + 'jpg'
                    console.log("is it there ?",filePath );
                }

                console.log("here is file path found in database", filePath);

                fs.writeFile(filePath, data, { flag: 'w' }, (error) => {
                    if (error) {
                        console.log("error2", error);
                        db.rollbackConnection(con)
                        res.send({
                            "code": 400,
                            "message": "Failed to save document"
                        })
                    }
                    else {
                        db.executeQueryData(`update guardian_documents set APPLICANT_ID=?, APPLICANT_NO=?, DOCUMENT_NAME=?, FILE_TYPE=?, FILE_LINK=?, MAKER_REMARK=?, IS_APPROVED_CHECKER = ?, IS_APPROVED_VERIFIER = ? where ID = ?`, [req.body.APPLICANT_ID, req.body.APPLICANT_NO, req.body.DOCUMENT_NAME, req.body.FILE_TYPE, filePath, req.body.MAKER_REMARK, req.body.IS_APPROVED_CHECKER, req.body.IS_APPROVED_VERIFIER, req.body.ID], supportKey, (error, documentInsertResult) => {
                            if (error) {
                                console.log("error3", error);
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

