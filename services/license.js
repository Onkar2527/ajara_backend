const db = require('../utilities/dbModule');



function reqData(req) {
    data = {
        CLIENT_ID: req.body.CLIENT_ID,
        LICENSE_NUMBER: req.body.LICENSE_NUMBER,
        STATE: req.body.STATE,
        NAME: req.body.NAME,
        PERMANENT_ADDRESS: req.body.PERMANENT_ADDRESS,
        PERMANENT_ZIP: req.body.PERMANENT_ZIP,
        TEMPORARY_ADDRESS: req.body.TEMPORARY_ADDRESS,
        TEMPORARY_ZIP: req.body.TEMPORARY_ZIP,
        CITIZENSHIP: req.body.CITIZENSHIP,
        OLA_NAME: req.body.OLA_NAME,
        OLA_CODE: req.body.OLA_CODE,
        GENDER: req.body.GENDER,
        FATHER_OR_HUSBAND_NAME: req.body.FATHER_OR_HUSBAND_NAME,
        DOB: req.body.DOB,
        DOE: req.body.DOE,
        TRANSPORT_DOE: req.body.TRANSPORT_DOE,
        DOI: req.body.DOI,
        TRANSPORT_DOI: req.body.TRANSPORT_DOI,
        PROFILE_IMAGE: req.body.PROFILE_IMAGE,
        BLOOD_GROUP: req.body.BLOOD_GROUP,
        VEHICLE_CLASSES: req.body.VEHICLE_CLASSES,
        INITIAL_DOI: req.body.INITIAL_DOI
    }

    return data;
}

exports.get = (req, res) => {
    let supportKey = req.headers['supportkey'];
    const q = `select * from license_verified_list where LICENSE_NUMBER = '${req.body.LICENSE_NUMBER}'`
    db.executeQuery(q, supportKey, (error, results) => {
        if (error) {
            console.log(error);
            res.send({
                "code": 400,
                "message": "Failed to get license verification info "
            })
        }
        else {
            res.send({
                "code": 200,
                "message": "OK",
                "data": results
            })

        }
    })

}

exports.create = (req, res) => {
    const supportKey = req.headers['supportkey'];


    const data = reqData(req);
    const q = `insert into license_verified_list set ?`

    db.executeQueryData(q, data, supportKey, (error) => {

        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed to save license info"
            })
        }
        else {
            res.send({
                "code": 200,
                "message": "license information saved successfully"
            })

        }
    })



}

exports.update = (req, res) => {
    const supportKey = req.headers['supportkey'];


    const data = reqData(req);
    let setData = '';
    let recData = [];

    Object.keys(data).forEach(key => {
        setData += `${key} = ? ,`;
        recData.push(data[key]);
    });

    setData2 = setData.slice(0, -1);


    const q = `update license_verified_list set ${setData2} where ID = ${req.body.ID}`
    db.executeQueryData(q, recData, supportKey, (error) => {
        if (error) {
            console.log(error);
            res.send({
                "code": 400,
                "message": "Failed to update license info"
            })

        }
        else {
            res.send({
                "code": 200,
                "message": "license information updated successfully"
            })

        }

    })


}