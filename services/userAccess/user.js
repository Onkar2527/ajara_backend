const db = require('../../utilities/dbModule');
const bcrypt = require('bcryptjs');

var userMaster = 'user_master';
var viewUserMaster = 'view_' + userMaster;

// Helper to check if a string is already a bcrypt hash
function isBcryptHash(str) {
    return typeof str === 'string' && /^\$2[aby]\$[0-9]{2}\$[./A-Za-z0-9]{53}$/.test(str);
}

// Auto-migration: Ensure PASSWORD column in user_master is large enough for bcrypt hashes (VARCHAR(255))
db.executeQuery(`ALTER TABLE user_master MODIFY COLUMN PASSWORD VARCHAR(255)`, '', (err) => {
    if (!err) console.log("[DB] Ensured PASSWORD column in user_master is VARCHAR(255)");
});

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

        // Query user by username only, then verify password with bcrypt
        const results1 = await db.executeQueryData(`SELECT * FROM user_master WHERE BINARY USER_NAME = ?`, [username], supportKey);

        if (results1.length === 1) {
            const user = results1[0];
            let isPasswordValid = false;

            if (isBcryptHash(user.PASSWORD)) {
                // Compare with bcrypt hash
                isPasswordValid = await bcrypt.compare(password, user.PASSWORD);
            } else {
                // Backward compatibility: match existing plain-text password
                if (user.PASSWORD === password) {
                    isPasswordValid = true;
                    // Automatically upgrade plain-text password to bcrypt hash in DB
                    try {
                        const hashedPassword = await bcrypt.hash(password, 10);
                        await db.executeQueryData(`UPDATE user_master SET PASSWORD = ? WHERE ID = ?`, [hashedPassword, user.ID], supportKey);
                        console.log(`[AUTH] Seamlessly upgraded password to bcrypt for user: ${username}`);
                    } catch (hashErr) {
                        console.error('[AUTH] Failed to upgrade password to bcrypt:', hashErr);
                    }
                }
            }

            if (!isPasswordValid) {
                return res.status(404).send({ "code": 404, "message": "Username OR Password does not exist" });
            }

            const current_dt = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const query = `UPDATE user_master SET LAST_LOGIN_TIME = '${current_dt}' WHERE ID = ${user.ID}`;
            await db.executeQuery(query, '');

            const getDaysQ = `SELECT TIMESTAMPDIFF(DAY, '${user.PASSWORD_RESET_DATE}', '${current_dt}') AS DAYS`;
            const numDateR = await db.executeQuery(getDaysQ, '');
            const numDate = (numDateR.length > 0) ? (numDateR[0]['DAYS'] || 0) : 0;

            const send_data = {
                ID: user.ID,
                ROLE_ID: user.ROLE_ID,
                BRANCH_ID: user.BRANCH_ID,
                NAME: user.NAME,
                USER_NAME: user.USER_NAME,
                LAST_LOGIN_TIME: current_dt,
                PASSWORD_RESET_DATE: user.PASSWORD_RESET_DATE,
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
        let query = ` select * from user_master where 1=1 `
        let params = [];

        if (BRANCH_ID) {
            query += ` AND BRANCH_ID = ? `
            params.push(BRANCH_ID);
        }
        if (ROLE_ID) {
            query += ` AND ROLE_ID = ?`
            params.push(ROLE_ID);
        }
        if (USER_ID) {
            query += ` AND ID = ?`
            params.push(USER_ID);
        }

        let result = await db.executeQueryData(query, params, supportKey);

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
        let query = `select * from branch_master where ID = ?`
        let result = await db.executeQueryData(query, [BRANCH_ID], supportKey);

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

        let query = `select * from role_master where ID = ?`
        let result = await db.executeQueryData(query, [ROLE_ID], supportKey);

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

        let selectQ = `SELECT * FROM user_master WHERE BINARY USER_NAME = ?`;

        let result = await db.executeQueryData(selectQ, [username], "");

        if (result.length > 0) {
            let user = result[0];
            let isOldPassValid = false;

            if (isBcryptHash(user.PASSWORD)) {
                isOldPassValid = await bcrypt.compare(oldpass, user.PASSWORD);
            } else {
                isOldPassValid = (user.PASSWORD === oldpass);
            }

            if (!isOldPassValid) {
                return res.send({
                    "code": 404,
                    "error": "Invalid old password"
                });
            }

            // Hash new password using bcrypt
            const hashedNewPassword = await bcrypt.hash(newpass, 10);

            let updatePassQ = `UPDATE user_master SET PASSWORD = ?, PASSWORD_RESET_DATE = ? WHERE ID = ?`;

            await db.executeQueryData(updatePassQ, [hashedNewPassword, current_dt, user.ID]);

            res.send({
                "code": 200,
                "message": "success"
            });
        }
        else {
            res.send({
                "code": 404,
                "error": "No user found"
            });
        }
    }
    catch (error) {
        console.log(error);
        res.send({
            "code": 400,
            "error": error
        });
    }
};
