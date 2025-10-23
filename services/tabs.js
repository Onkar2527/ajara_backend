const db = require('../utilities/dbModule')
const rsa = require('../RSA/rsa')


exports.getTabs = async (req, res) => {
    const { APPLICANT_ID } = req.body;
    const supportKey = req.headers['supportkey'];
    const q = `select * from view_tab_master where APPLICANT_ID = ? ORDER BY view_tab_master.INDEX`;

    try {
        const ResTabs = await db.executeQueryData(q, [APPLICANT_ID], supportKey);
        res.send({
            "code": 200,
            "message": "ok",
            "data": ResTabs
        });
    } catch (error) {
        console.log("error", error);
        res.status(400).send({
            "code": 400,
            "message": "Failed to get tabs"
        });
    }
};
