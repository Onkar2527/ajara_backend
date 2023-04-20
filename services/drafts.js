const db = require('../utilities/dbModule');


exports.get = (req, res) =>{

    const supportKey = req.header['supportkey'];
   
    db.executeQuery( `select * from basic_details where STATUS = 'D'`, supportKey, (error, results)=>{
        if(error)
        {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed to get drafts"
            })
        }
        else{
            res.send({
                "code": 200,
                "message": "ok",
                "data": results
            })
        }
    })
}