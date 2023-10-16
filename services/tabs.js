const db = require('../utilities/dbModule')
const rsa = require('../RSA/rsa')


exports.getTabs = (req, res) => {

    let ROLE_ID = req.body.ROLE_ID;
    let APPLICANT_ID = req.body.APPLICANT_ID;
    let TRACK_ID = req.body.TRACK_ID;
    const supportKey = req.headers['supportkey'];



    let q = `select * from view_tab_master where APPLICANT_ID = ?  ORDER BY view_tab_master.INDEX`


    db.executeQueryData(q, [APPLICANT_ID], supportKey, (error, ResTabs) => {
        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed to get tabs "
            })
        }
        else {

            // let eData = rsa.encriptData(ResTabs)
            res.send({
                "code": 200,
                "message": "ok",
                "data": ResTabs
            })
        }
    })

}