const db = require('.././utilities/dbModule');
const rsa = require('../RSA/rsa')


exports.getComponunts = (req, res) => {
    const supportKey = req.headers['supportkey']
    let ROLE_ID = req.body.ROLE_ID;
    // console.log("data is", data);

    let q = `select * from component_master where ROLE_ID = ? ORDER BY SEQ`
    db.executeQueryData(q, [ROLE_ID], supportKey, (error, componentData) => {
        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed to get component deatails."
            })

        }
        else {
            res.send({
                "code": 200,
                "message": "ok",
                "data": componentData
            })
        }
    })

}