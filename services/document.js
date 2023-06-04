const db = require('../utilities/dbModule');

function reqData(req){
    data = {

        DOCUMENT_GROUP_ID : req.body.DOCUMENT_GROUP_ID,
        DOCUMENT_NAME : req.body.DOCUMENT_NAME
        
    }
    return data;
}

exports.get = (req, res) => {
    let supportKey = req.headers['supportkey'];

    db.executeQueryData(`select * from document_master where 1`, '', supportKey, (error, result) => {
        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "failed to get documents"
            })
        }
        else {
            res.send({
                "code": 200,
                "message": "ok",
                "data": result
            })
        }
    })
}

exports.create = (req,res)=>{
    let supportKey = req.headers['supportkey'];
    data = reqData(req);

    db.executeQueryData(`insert into document_master set ?` ,data, supportKey,(error)=>{
        if(error)
        {
            console.log("error",error);
            res.send({
                "code": 400,
                "message": "Failed to insert document record"
            })
        }
        else{
            res.send({
                "code":200,
                "message": "Deocument record inserted successful."
            })
        }
    })
    
}