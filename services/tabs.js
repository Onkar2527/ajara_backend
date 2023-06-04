const db = require('../utilities/dbModule')
const rsa = require('../RSA/rsa')


exports.getTabs = (req,res) =>{

    let dt = rsa.decriptData(req.body.data)
    console.log("incoData", dt);
    let data = dt
    const supportKey = req.headers['supportkey'];
    db.executeQueryData(`select * from view_tab_master where APPLICANT_ID = ? ORDER BY view_tab_master.INDEX`, [data.APPLICANT_ID],supportKey, (error, ResTabs)=>{
        if(error)
        {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed to get tabs "
            })
        }
        else{

           // let eData = rsa.encriptData(ResTabs)
            res.send({
                "code": 200,
                "message": "ok",
                "data": ResTabs
            })
        }
    })
}