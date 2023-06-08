const db = require('../utilities/dbModule');
const rsa = require('../RSA/rsa')


exports.update = (req, res) =>{

    //let data = rsa.decriptData(req.body.data)
    let dt = {
        IS_CHECKED : req.body.IS_CHECKED,
        IS_PROVIDED : req.body.IS_PROVIDED,
        IS_VERIFIED : req.body.IS_VERIFIED,
        SEND_TO_REFILL : req.body.SEND_TO_REFILL,
        SEND_TO_REFILL_COUNT : req.body.SEND_TO_REFILL_COUNT,
        CHECKER_REMARK : req.body.CHECKER_REMARK,
        MAKER_REMARK : req.body.MAKER_REMARK,
        VERIFIER_REMARK : req.body.VERIFIER_REMARK
    }
    const supportKey = req.headers['supportkey'];
   db.executeQueryData(`update extra_information set ? where ID = ?`, [dt,req.body.ID], supportKey,(error)=>{
    if(error)
    {
        console.log("error",error);
        res.send({
            "code": 400
        })
    }
    else
    {
        res.send({
            "code": 200,
            "message": "extraInformation updated successful",
            
        })
    }

})

}



