const db = require('../utilities/dbModule')
const rsa = require('../RSA/rsa')


exports.getTabs = (req, res) => {

    let ROLE_ID = req.body.ROLE_ID;
    let APPLICANT_ID = req.body.APPLICANT_ID;
    const supportKey = req.headers['supportkey'];

    let q = `select * from view_tab_master where APPLICANT_ID = ? ORDER BY view_tab_master.INDEX`
    if (ROLE_ID == 1) {
        q = `select * from view_tab_master where APPLICANT_ID = ? AND TAB_ID not in (6,7) ORDER BY view_tab_master.INDEX`
    }
    else if (ROLE_ID == 2) {
        q = `select * from view_tab_master where APPLICANT_ID = ? AND TAB_ID not in (7) ORDER BY view_tab_master.INDEX`
    }
    else if (ROLE_ID == 3) {
        q = `select * from view_tab_master where APPLICANT_ID = ? AND TAB_ID not in (6) ORDER BY view_tab_master.INDEX`
    }
    else {
        console.log("Failed to set query");
    }
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