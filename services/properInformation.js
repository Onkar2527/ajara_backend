const db = require('../utilities/dbModule');


function reqData(req) {

    let data = {
        APPLICANT_ID: req.body.APPLICANT_ID,
        APPLICANT_NO: req.body.APPLICANT_NO,
        IS_FOUR_WHEELER: req.body.IS_FOUR_WHEELER,
        IS_TWO_WHEELER: req.body.IS_TWO_WHEELER,
        IS_HOME_THEATER: req.body.IS_HOME_THEATER,
        IS_AC: req.body.IS_AC,
        IS_DIGITAL_CAMERA: req.body.IS_DIGITAL_CAMERA,
        IS_VIDEO_PLAYER: req.body.IS_VIDEO_PLAYER,
        IS_MICROWAVE: req.body.IS_MICROWAVE,
        IS_LCD_TV: req.body.IS_LCD_TV,
        IS_COMPUTER: req.body.IS_COMPUTER,
        IS_WASHING_MACHINE: req.body.IS_WASHING_MACHINE,
        FOUR_WHEELER_MODEL: req.body.FOUR_WHEELER_MODEL,
        HOUSE_DETAIL: req.body.HOUSE_DETAIL
    }

    return data;
}

exports.get = async (req, res) => {
    const supportKey = req.headers['supportkey'];
    const q = `select * from property_information where APPLICANT_ID = ?` + (req.body.APPLICANT_NO ? ' AND APPLICANT_NO = ?' : '');
    const params = [req.body.APPLICANT_ID];
    if (req.body.APPLICANT_NO) {
        params.push(req.body.APPLICANT_NO);
    }

    try {
        const results = await db.executeQueryData(q, params, supportKey);
        res.send({
            "code": 200,
            "message": "OK",
            "data": results
        });
    } catch (error) {
        console.log("error", error);
        res.status(400).send({
            "code": 400,
            "message": "Failed to get property information"
        });
    }
};

exports.create = async (req, res) => {
    const supportKey = req.headers['supportkey'];
    const data = reqData(req);
    const q = `insert into property_information set ?`;

    try {
        await db.executeQueryData(q, data, supportKey);
        res.send({
            "code": 200,
            "message": "Property information saved successfully"
        });
    } catch (error) {
        console.log("error", error);
        res.status(400).send({
            "code": 400,
            "message": "Failed to save property information"
        });
    }
};

exports.update = async (req, res) => {
    const supportKey = req.headers['supportkey'];
    const data = reqData(req);
    let setData = '';
    let recData = [];

    Object.keys(data).forEach(key => {
        setData += `${key} = ? ,`;
        recData.push(data[key]);
    });

    setData = setData.slice(0, -1);

    const q = `update property_information set ${setData} where ID = ?`;
    recData.push(req.body.ID);

    try {
        await db.executeQueryData(q, recData, supportKey);
        res.send({
            "code": 200,
            "message": "Property information updated successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            "code": 400,
            "message": "Failed to update property information"
        });
    }
};
