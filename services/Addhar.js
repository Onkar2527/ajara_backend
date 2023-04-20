
const db = require('../utilities/dbModule');


exports.create = (req, res) => {
    const data = {
        AADHAAR_NUMBER: req.body.AADHAAR_NUMBER,
        APPLICANT_ID : req.body.APPLICANT_ID,
        ADDRESS: req.body.ADDRESS,
        AGE: req.body.AGE,
        DOB: req.body.DOB,
        APPLICANT_NAME: req.body.APPLICANT_NAME,
        GENDER: req.body.GENDER,
        PROFILE_IMAGE: req.body.PROFILE_IMAGE
    }

    var setData = "";
    var recordData = [];

    Object.keys(data).forEach(key => {

      setData += `${key} ,`;
         recordData.push(data[key]) ;
    });

    const query = `insert into aadhaar_verified_list set ?`

    db.executeQueryData(query, supportKey, (error)=>{
        if(error)
        {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed to save aadhaar details"
            })
        }
        else
        {
            res.send({
                "code": 200,
                "message": "Aadhaar information saved successfully"
            })
        }
    })
    
    

    
}

exports.get = (req,res) =>{
    let supportKey = req.headers['supportkey'];
    const q = `select * from aadhaar_verified_list where APPLICANT_ID = ${req.body.APPLICANT_ID}`
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