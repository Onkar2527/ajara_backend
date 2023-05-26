const mm = require('../utilities/dbModule');





exports.get = (req, res) => {
    let supportKey = req.headers['supportkey'];

    mm.executeQueryData(`select * from document_group_master where 1`, '', supportKey, (error, result) => {
        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "failed to get documents document groups"
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


