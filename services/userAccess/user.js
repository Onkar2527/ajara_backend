const db = require('../../utilities/dbModule');

var userMaster = 'user_master';
var viewUserMaster = 'view_' + userMaster

exports.login = async (req, res) => {
    try {
        const { USER_NAME: username, PASSWORD: password } = req.body;
        const supportKey = req.headers['supportkey'];

        if (!username || !password) {
            return res.status(400).send({
                "code": 400,
                "message": "Username or password parameter missing",
            });
        }

        const results1 = await db.executeQueryData(`SELECT * FROM user_master WHERE BINARY USER_NAME = ? AND BINARY PASSWORD = ?`, [username, password], supportKey);

        if (results1.length === 1) {
            const current_dt = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const query = `UPDATE user_master SET LAST_LOGIN_TIME = '${current_dt}' WHERE ID = ${results1[0].ID}`;
            await db.executeQuery(query, '');

            const getDaysQ = `SELECT TIMESTAMPDIFF(DAY, '${results1[0].PASSWORD_RESET_DATE}', '${current_dt}') AS DAYS`;
            const numDateR = await db.executeQuery(getDaysQ, '');
            const numDate = (numDateR.length > 0) ? (numDateR[0]['DAYS'] || 0) : 0;

            const send_data = {
                ID: results1[0].ID,
                ROLE_ID: results1[0].ROLE_ID,
                BRANCH_ID: results1[0].BRANCH_ID,
                NAME: results1[0].NAME,
                USER_NAME: results1[0].USER_NAME,
                LAST_LOGIN_TIME: current_dt,
                PASSWORD_RESET_DATE: results1[0].PASSWORD_RESET_DATE,
                DAYS_OF_RESET_PASS: numDate
            };

            res.send({ "code": 200, "data": send_data });
        } else if (results1.length > 1) {
            res.status(400).send({ "code": 400, "message": "More than one user." });
        } else {
            res.status(404).send({ "code": 404, "message": "Username OR Password does not exist" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ "code": 500, "message": "Internal server error" });
    }
};

exports.getUser = async (req, res) => {
    try {
        let BRANCH_ID = req.body.BRANCH_ID;
        let ROLE_ID = req.body.ROLE_ID;
        let USER_ID = req.body.ID;

        let supportKey = req.headers['supportkey'];
        let query = ` select * from user_master where 1`

        if (BRANCH_ID) {
            query += ` AND BRANCH_ID = ${BRANCH_ID} `
        }
        if (ROLE_ID) {
            query += ` AND ROLE_ID = ${ROLE_ID}`
        }
        if (USER_ID) {
            query += ` AND ID = ${USER_ID}`
        }

        let result = await db.executeQuery(query, supportKey);

        console.log(query, result);

        res.send({
            "message": "success",
            "code": 200,
            "data": result
        })
    }
    catch (error) {
        console.log(error);
        res.send({
            "message": "Failed to get user details",
            "code": 400
        })
    }

}

exports.getUserBranch = async (req, res) => {
    try {
        let supportKey = req.headers['supportkey'];
        let BRANCH_ID = req.body.BRANCH_ID;
        let query = `select * from branch_master where ID = ${BRANCH_ID}`

        let result = await db.executeQuery(query, supportKey);

        res.send({
            "message": "success",
            "code": 200,
            "data": result
        })
    }
    catch (error) {
        console.log(error)
        res.send({
            "message": "Failed to get user's branch",
            "code": 400
        })
    }

}

exports.getUserRole = async (req, res) => {

    try {
        let supportKey = req.headers['supportkey'];
        let ROLE_ID = req.body.ROLE_ID;

        let query = `select * from role_master where ID = ${ROLE_ID}`

        let result = await db.executeQuery(query, supportKey);

        res.send({
            "message": "success",
            "code": 200,
            "data": result
        })
    }
    catch (error) {
        console.log(error)
        res.send({
            "message": "Failed to get user's role",
            "code": 400
        })
    }

}

exports.resetPassword = async (req, res) => {
    try {
        let username = req.body.username;
        let oldpass = req.body.oldpass;
        let newpass = req.body.newpass;

        const current_dt = new Date().toISOString().slice(0, 19).replace('T', ' ');

        let selectQ = `SELECT * FROM user_master WHERE BINARY USER_NAME = ? and BINARY PASSWORD = ?`;

        let result = await db.executeQueryData(selectQ, [username, oldpass], "");

        if (result.length > 0) {
            let user_id = result[0].ID;

            let updatePassQ = `update user_master set PASSWORD = ?, PASSWORD_RESET_DATE = ? where ID = ?`

            await db.executeQueryData(updatePassQ, [newpass, current_dt, user_id]);

            res.send({
                "code": 200,
                "message": "success"
            })

        }
        else {
            res.send({
                "code": 404,
                "error": "No user found"
            })
        }
    }
    catch (error) {
        console.log(error);
        res.send({
            "code": 400,
            "error": error
        })
    }
}
