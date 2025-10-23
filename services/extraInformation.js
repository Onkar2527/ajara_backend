const db = require('../utilities/dbModule');
const rsa = require('../RSA/rsa')


exports.update = async (req, res) => {
    let dt = {
        IS_CHECKED: req.body.IS_CHECKED,
        IS_PROVIDED: req.body.IS_PROVIDED,
        IS_VERIFIED: req.body.IS_VERIFIED,
        SEND_TO_REFILL: req.body.SEND_TO_REFILL,
        SEND_TO_REFILL_COUNT: req.body.SEND_TO_REFILL_COUNT,
        CHECKER_REMARK: req.body.CHECKER_REMARK,
        MAKER_REMARK: req.body.MAKER_REMARK,
        VERIFIER_REMARK: req.body.VERIFIER_REMARK,
        REFILL_BY: req.body.REFILL_BY
    };
    const supportKey = req.headers['supportkey'];
    try {
        await db.executeQueryData(`update extra_information set ? where ID = ?`, [dt, req.body.ID], supportKey);
        res.send({
            "code": 200,
            "message": "extraInformation updated successfully",
        });
    } catch (error) {
        console.log("error", error);
        res.status(400).send({
            "code": 400,
            "message": "Failed to update extraInformation"
        });
    }
};
