const db = require('../utilities/dbModule')
const rsa = require('../RSA/rsa')


exports.getTabs = (req, res) => {

    let dt = rsa.decriptData(req.body.data)
    console.log("incoData", dt);
    let data = dt
    const supportKey = req.headers['supportkey'];
    // const userKey = req.headers['user-key']
    // console.log("here is userkey", userKey);

    db.executeQueryData(`select ROLE_ID from user_key_master where USER_KEY = ?`, [data.USER_KEY], supportKey, (error, userRoleInfo) => {
        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed to get user_role for tab"
            })
        }
        else {
            console.log("userrrrrr", userRoleInfo);
            if (userRoleInfo.length >0) {
                let q = `select * from view_tab_master where APPLICANT_ID = ? ORDER BY view_tab_master.INDEX`
                if (userRoleInfo[0].ROLE_ID == 1) {
                    q = `select * from view_tab_master where APPLICANT_ID = ? AND TAB_ID not in (6,7) ORDER BY view_tab_master.INDEX`
                }
                else if (userRoleInfo[0].ROLE_ID == 2) {
                    q = `select * from view_tab_master where APPLICANT_ID = ? AND TAB_ID not in (7) ORDER BY view_tab_master.INDEX`
                }
                else if (userRoleInfo[0].ROLE_ID == 3) {
                    q = `select * from view_tab_master where APPLICANT_ID = ? AND TAB_ID not in (6) ORDER BY view_tab_master.INDEX`
                }
                else {
                    console.log("Failed to set query");
                }
                db.executeQueryData(q, [data.APPLICANT_ID], supportKey, (error, ResTabs) => {
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
            else {
                res.send({
                    "code": 400,
                    "message": "User record not found for tab"
                })
            }

        }
    })


}