const db = require('.././utilities/dbModule');
const rsa = require('../RSA/rsa')


exports.getComponunts = (req,res) =>{
    const supportKey = req.headers['supportkey']
    let data = rsa.decriptData(req.body.data)
    console.log("data is", data);

    db.executeQueryData(`select * from user_key_master where USER_KEY = ? `, [data.USER_KEY], supportKey,(error, result)=>{
        if(error)
        {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "failed to get user_key"
            })
        }
        else
        {
            if(result.length > 0 && result.length < 2)
            {
                let q = `select * from component_master where ROLE_ID = ?`
                db.executeQueryData(q,[result[0].ROLE_ID],supportKey,(error, componentData)=>{
                    if(error)
                    {
                        console.log("error", error);
                        res.send({
                            "code": 400,
                            "message" : "Failed to get component deatails."
                        })

                    }
                    else
                    {
                         let eData = rsa.encriptData(componentData)
                        res.send({
                            "code": 200,
                            "message": "ok",
                            "data" : eData
                        })
                    }
                })
            }
            else
            {
                res.send({
                    "code": 400,
                    "message": "user key not found"
                })
            }
        }
    } )
}