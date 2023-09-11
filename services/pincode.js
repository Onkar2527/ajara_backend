const db = require('../utilities/dbModule')

exports.getState = (req, res) =>{
    let supportKey = req.headers['supportkey'];
    db.executeQueryData(`select distinct STATE from pincode_master where COUNTRY = 'India'`, '', supportKey , (error, result)=>{
        if(error){
            console.log("error",error);
            result.send({
                "code": 400,
                "message": "Failed"
            })
        }
        else
        {
            res.send({
                "code": 200,
                "message": "succeess",
                "data" : result
            })
        }
    })

}

exports.getDistrict = (req, res) =>{
    let supportKey = req.headers['supportkey'];
    db.executeQueryData(`select distinct DISTRICT from pincode_master where 1 ${req.body.filter}`, '', supportKey , (error, result)=>{
        if(error){
            console.log("error",error);
            result.send({
                "code": 400,
                "message": "Failed"
            })
        }
        else
        {
            res.send({
                "code": 200,
                "message": "succeess",
                "data" : result
            })
        }
    })

}

exports.getTaluka = (req, res) =>{
    let supportKey = req.headers['supportkey'];
    db.executeQueryData(`select distinct TALUKA from pincode_master where 1 ${req.body.filter}`, '', supportKey , (error, result)=>{
        if(error){
            console.log("error",error);
            result.send({
                "code": 400,
                "message": "Failed"
            })
        }
        else
        {
            res.send({
                "code": 200,
                "message": "succeess",
                "data" : result
            })
        }
    })

}

exports.getVillage = (req, res) =>{
    let supportKey = req.headers['supportkey'];
    db.executeQueryData(`select VILLAGE from pincode_master where 1 ${req.body.filter}`, '', supportKey , (error, result)=>{
        if(error){
            console.log("error",error);
            result.send({
                "code": 400,
                "message": "Failed"
            })
        }
        else
        {
            res.send({
                "code": 200,
                "message": "succeess",
                "data" : result
            })
        }
    })

}