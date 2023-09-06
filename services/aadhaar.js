
const db = require('../utilities/dbModule');

function reqData(req){
    const data = {
        AADHAAR_NUMBER: req.body.AADHAAR_NUMBER,
        APPLICANT_ID: req.body.APPLICANT_ID,
        APPLICANT_NO: req.body.APPLICANT_NO,
        ADDRESS_ID: req.body.ADDRESS_ID,
       
        DOB: req.body.DOB,
        APPLICANT_FULL_NAME: req.body.APPLICANT_FULL_NAME,
        GENDER: req.body.GENDER,
        PROFILE_IMAGE: req.body.PROFILE_IMAGE
    }
    return data
}


exports.create = (req, res) => {
   let data = reqData(req)
 let supportKey  = req.headers['supportKey']
    var setData = "";
    var recordData = [];

    let con = db.openConnection()

    Object.keys(data).forEach(key => {

        setData += `${key} ,`;
        recordData.push(data[key]);
    });

   
console.log("data from req", data);
    db.executeDML(`insert into aadhaar_address set ?`, data.ADDRESS_ID , supportKey ,con, (error, results)=>{
        if(error)
        {
            db.rollbackConnection(con)
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "failed"
            })


        }
        else{
            data.ADDRESS_ID = results.insertId;
            console.log("insertid", results);
            console.log("data at the end", data);
            db.executeDML(`insert into aadhaar_verified_list set ?`, data, supportKey, con , (error) => {
                if (error) {
                    console.log("error", error);
                    db.rollbackConnection(con)
                    res.send({
                        "code": 400,
                        "message": "Failed to save aadhaar details"
                    })
                }
                else {
                    db.commitConnection(con)
                    res.send({
                        "code": 200,
                        "message": "Aadhaar information saved successfully"
                    })
                }
            })
        }
    })




}

exports.get = (req, res) => {
    let supportKey = req.headers['supportkey'];
    const q = `select * from aadhaar_verified_list where APPLICANT_NO = ${req.body.APPLICANT_NO} AND AADHAAR_NUMBER = ${req.body.AADHAAR_NUMBER} `
   console.log(q);
    db.executeQuery(q, supportKey, (error, results) => {
        if (error) {
            console.log("err", error);
            res.send({
                "code": 400,
                "message": "Failed to get facilities details "
            })
        }
        else {
            if (results.length > 0) {
               
                    db.executeQuery(`select * from aadhaar_address where ID = ${results[0].ADDRESS_ID}`, supportKey, (error, resultAdress) => {
                        if (error) {
                            console.log("error", error);
                            res.send({"msg":"failed"})
                        }
                        else {
                            results[0].ADDRESS_ID = resultAdress
                            res.send({
                                "code": 200,
                                "message": "OK",
                                "data": results

                            })

                        }
                    })
               
            }
            else {
                res.send({
                    "code": 400,
                    "message": "something wents wrong"
                })
            }
        }
    })




}

exports.update = (req, res) => {

}