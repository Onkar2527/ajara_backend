const db = require('../../utilities/dbModule');

var userMaster = 'user_master';
var viewUserMaster = 'view_' + userMaster

exports.login = (req, res) => {
    try {

        let username = req.body.USER_NAME;
        let password = req.body.PASSWORD;


        let supportKey = req.headers['supportkey'];
        console.log("reqData", req.body);

        if (!username || !password) {
            res.send({
                "code": 400,
                "message": "username or password parameter missing",
            });
        }
        else {
            console.log("upcoming credentials ps", username, password);
            // console.log(`SELECT * FROM ${viewUserMaster}  WHERE  USER_NAME = ? and PASSWORD = ?`);
            db.executeQueryData(`SELECT * FROM ${viewUserMaster}  WHERE  USER_NAME = ? and PASSWORD = ?`, [username, password], supportKey, (error, results1) => {
                if (error) {
                    console.log(error);

                    res.send({
                        "code": 400,
                        "message": "Failed to get record",
                    });
                }
                else {
                    console.log("here is login dta", results1);

                    if (results1.length == 1) {
                        let send_data = {
                            ID: results1[0].ID,
                            ROLE_ID: results1[0].ROLE_ID,
                            BRANCH_ID: results1[0].BRANCH_ID,
                            NAME: results1[0].NAME,
                            USER_NAME: results1[0].USER_NAME,
                        }

                        res.send({
                            "code": 200,
                            "data": send_data
                        })
                    }
                    else if (results1.length > 1) {
                        res.send({
                            "code": 400,
                            "message": "More than one user."
                        });
                    }
                    else {
                        res.send({
                            "code": 404,
                            "message": "Username OR Password does not exits"
                        });

                    }
                }
            });
        }

    } catch (error) {
        console.log(error);
    }

}

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
        if(USER_ID){
            query += ` AND ID = ${USER_ID}`
        }

        let result = await db.executeQueryAsyncAwait(query, supportKey);

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

        let result = await db.executeQueryAsyncAwait(query, supportKey);

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

        let result = await db.executeQueryAsyncAwait(query, supportKey);

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
