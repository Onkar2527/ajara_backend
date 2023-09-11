const db = require('../utilities/dbModule');



function reqData(req) {
    data = {
        CLIENT_ID: req.body.CLIENT_ID,
        EPIC_NO: req.body.EPIC_NO,
        GENDER: req.body.GENDER,
        STATE: req.body.STATE,
        NAME: req.body.NAME,
        RELATION_NAME: req.body.RELATION_NAME,
        RELATION_TYPE: req.body.RELATION_TYPE,
        HOUSE_NO: req.body.HOUSE_NO,
        DOB: req.body.DOB,
        AGE: req.body.AGE,
        AREA: req.body.AREA,
        DISTRICT: req.body.DISTRICT,
        ADDITIONAL_CHECK: req.body.ADDITIONAL_CHECK,
        MULTIPLE: req.body.MULTIPLE,
        LAST_UPDATE: req.body.LAST_UPDATE,
        ASSEMBLY_CONSTITUENCY: req.body.ASSEMBLY_CONSTITUENCY,
        ASSEMBLY_CONSTITUENCY_NUMBER: req.body.ASSEMBLY_CONSTITUENCY_NUMBER,
        POLLING_STATION: req.body.POLLING_STATION,
        PART_NUMBER: req.body.PART_NUMBER,
        PART_NAME: req.body.PART_NAME,
        SLNO_INPART: req.body.SLNO_INPART,
        PS_LAT_LONG: req.body.PS_LAT_LONG,
        RLN_NAME_V1: req.body.RLN_NAME_V1,
        RLN_NAME_V2: req.body.RLN_NAME_V2,
        RLN_NAME_V3: req.body.RLN_NAME_V3,
        SECTION_NO: req.body.SECTION_NO,
        NAME_V1: req.body.NAME_V1,
        NAME_V2: req.body.NAME_V2,
        NAME_V3: req.body.NAME_V3,
        ST_CODE: req.body.ST_CODE,
        PARLIAMENTARY_CONSTITUENCY: req.body.PARLIAMENTARY_CONSTITUENCY,

    }

    return data;
}

exports.get = (req, res) => {
    let supportKey = req.headers['supportkey'];
    const q = `select * from voterid_verification_master where EPIC_NO = '${req.body.EPIC_NO}'`
    db.executeQuery(q, supportKey, (error, results) => {
        if (error) {
            console.log(error);
            res.send({
                "code": 400,
                "message": "Failed to get voter verification info "
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
    const q = `insert into voterid_verification_master set ?`

    db.executeQueryData(q, data, supportKey, (error) => {

        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed to save voter info"
            })
        }
        else {
            res.send({
                "code": 200,
                "message": "voter information saved successfully"
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


    const q = `update voterid_verification_master set ${setData2} where ID = ${req.body.EPIC_NO}`
    db.executeQueryData(q, recData, supportKey, (error) => {
        if (error) {
            console.log(error);
            res.send({
                "code": 400,
                "message": "Failed to update voter info"
            })

        }
        else {
            res.send({
                "code": 200,
                "message": "voter information updated successfully"
            })

        }

    })


}