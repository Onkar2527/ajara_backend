const rsa = require('../../RSA/rsa');

const db = require('../../utilities/dbModule');

const jwt = require('jsonwebtoken');


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
