

const mm = require('../../utilities/dbModule');

const jwt = require('jsonwebtoken');


var userMaster = 'user_master';
var viewUserMaster = 'view_'+ userMaster 
exports.login = (req, res) => {
    try {

        console.log(req.headers);
        console.log(req.body);

        var username = req.body.USER_NAME;
        var password = req.body.PASSWORD;


        var supportKey = req.headers['supportkey'];

        if ((!username && username == '' && username == undefined) && (!password && password == '' && password == undefined)) {
            res.send({
                "code": 400,
                "message": "username or password parameter missing",
            });
        }
        else {
            console.log("upcoming credentials ps", username, password );
            console.log(`SELECT * FROM ${viewUserMaster}  WHERE  USER_NAME = ? and PASSWORD = ?`);
            mm.executeQueryData(`SELECT * FROM ${viewUserMaster}  WHERE  USER_NAME = ? and PASSWORD = ?`,[username, password] ,supportKey, (error, results1) => {
                if (error) {
                    console.log(error);

                    res.send({
                        "code": 400,
                        "message": "Failed to get record",
                    });
                }
                else {
                    console.log("here is login dta", results1);
                    if (results1.length > 0) {

                        mm.executeQuery(`UPDATE user_master set LAST_LOGIN_TIME = CURRENT_TIMESTAMP where  ID = ${results1[0].ID}`, supportKey, (error, resultRole) => {
                            if (error) {
                                console.log(error);

                                res.send({
                                    "code": 400,
                                    "message": "Failed to update last login time",
                                });
                            }
                            else {
                                var userDetails = [{
                                    ROLE_ID: results1[0].ROLE_ID,
                                    BRANCH_ID: results1[0].BRANCH_ID,
                                    NAME: results1[0].NAME
                                }]

                                // mm.executeQueryData(`update user`)

                                generateToken(results1[0].ID, res, userDetails);

                            }
                        })


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

function generateToken(userId, res, resultsUser) {

    try {

        var data = {
            "USER_ID": userId,
        }

        jwt.sign({ data }, process.env.SECRET, (error, token) => {
            if (error) {
                console.log("token error", error);
            }
            else {

                console.log("token generation", token);
                console.log(data);
                console.log("jkl :", resultsUser);

                res.send({
                    "code": 200,
                    "message": "Login sucessfull",
                    "data": [{
                        "token": token,
                        "UsersData": resultsUser
                    }]
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
}
