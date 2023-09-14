const db = require('../utilities/dbModule')

exports.getState = (req, res) => {
    let supportKey = req.headers['supportkey'];
    db.executeQueryData(`select distinct STATE from pincode_master where COUNTRY = 'India' order by STATE asc`, '', supportKey, (error, result) => {
        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed"
            })
        }
        else {
            res.send({
                "code": 200,
                "message": "succeess",
                "data": result
            })
        }
    })

}

exports.getDistrict = (req, res) => {
    let supportKey = req.headers['supportkey'];
    db.executeQueryData(`select distinct DISTRICT from pincode_master where 1 AND  STATE = '${req.body.filter}' order by DISTRICT ASC`, '', supportKey, (error, result) => {
        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed"
            })
        }
        else {
            res.send({
                "code": 200,
                "message": "succeess",
                "data": result
            })
        }
    })

}

exports.getTaluka = (req, res) => {
    let supportKey = req.headers['supportkey'];
    db.executeQueryData(`select distinct TALUKA from pincode_master where 1 AND DISTRICT = '${req.body.filter}' order by TALUKA asc`, '', supportKey, (error, result) => {
        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed"
            })
        }
        else {
            res.send({
                "code": 200,
                "message": "succeess",
                "data": result
            })
        }
    })

}

exports.getVillage = (req, res) => {
    let supportKey = req.headers['supportkey'];
    db.executeQueryData(`select distinct VILLAGE from pincode_master where 1 AND TALUKA = '${req.body.filter}' order by VILLAGE asc`, '', supportKey, (error, result) => {
        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed"
            })
        }
        else {
            res.send({
                "code": 200,
                "message": "succeess",
                "data": result
            })
        }
    })

}