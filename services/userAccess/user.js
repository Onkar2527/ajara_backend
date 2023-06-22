const rsa = require('../../RSA/rsa');

const db = require('../../utilities/dbModule');

const jwt = require('jsonwebtoken');


var userMaster = 'user_master';
var viewUserMaster = 'view_' + userMaster
exports.login = (req, res) => {
    try {

        // console.log("reqheader",req.headers);
        console.log("reqBody", req.body);
        if (req.body.data) {
            let dt = rsa.decriptData(req.body.data)
            data = {
                body: dt
            }
            console.log("dt ", dt);
        }


        var username = data.body.USER_NAME;
        var password = data.body.PASSWORD;


        var supportKey = req.headers['supportkey'];
        console.log("reqData", req.body);

        if ((!username && username == '' && username == undefined) && (!password && password == '' && password == undefined)) {
            res.send({
                "code": 400,
                "message": "username or password parameter missing",
            });
        }
        else {
            console.log("upcoming credentials ps", username, password);
            console.log(`SELECT * FROM ${viewUserMaster}  WHERE  USER_NAME = ? and PASSWORD = ?`);
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
                    if (results1.length > 0 && results1.length < 2) {
                        let userKey = genrateRandomKey(32, supportKey)

                        db.executeQueryData(`select * from user_key_master where USER_ID  = ?`, [results1[0].ID], supportKey, (error, resultUSER) => {
                            if (error) {
                                console.log("error", error);
                                res.send({
                                    "code": 400,
                                    "message": "Failed to get data using USER_DATA"
                                })
                            }
                            else {
                                console.log("resUSER", resultUSER);
                                if (resultUSER.length == 0) {
                                    // implement
                                    db.executeQueryData(`insert into user_key_master(USER_ID, USER_KEY, ROLE_ID) value(?,?,?)`, [results1[0].ID, userKey, results1[0].ROLE_ID], supportKey, (error) => {
                                        if (error) {
                                            console.log("error", error);
                                            res.send({
                                                "code": 400,
                                                "message": "failed"
                                            })
                                        }
                                        else {
                                            /// kjgdf
                                            db.executeQuery(`UPDATE user_master set LAST_LOGIN_TIME = CURRENT_TIMESTAMP where  ID = ${results1[0].ID}`, supportKey, (error, resultRole) => {
                                                if (error) {
                                                    console.log(error);

                                                    res.send({
                                                        "code": 400,
                                                        "message": "Failed to update last login time",
                                                    });
                                                }
                                                else {
                                                    var userDetails = [{
                                                        //  ROLE_ID: results1[0].ROLE_ID,
                                                        // BRANCH_ID: results1[0].BRANCH_ID,
                                                        //  NAME: results1[0].NAME,
                                                        USER_KEY: userKey
                                                    }]
                                                    let dtsend = rsa.encriptData(userDetails)
                                                    res.send({
                                                        "code": 200,
                                                        "data": dtsend
                                                    })
                                                    // db.executeQueryData(`update user`)

                                                    //generateToken(results1[0].ID, req, res, userDetails);

                                                }
                                            })
                                            ///sjgdug
                                        }
                                    })
                                    // implenment
                                }
                                else if (resultUSER.length == 1) {
                                    db.executeQueryData(`update user_key_master set USER_KEY = ? where USER_ID = ?`, [userKey, results1[0].ID], supportKey, (error) => {
                                        if (error) {
                                            console.log("error", error);
                                            res.send({
                                                "code": 400,
                                                "message": "failed"
                                            })
                                        }
                                        else {
                                            /// kjgdf
                                            db.executeQuery(`UPDATE user_master set LAST_LOGIN_TIME = CURRENT_TIMESTAMP where  ID = ${results1[0].ID}`, supportKey, (error, resultRole) => {
                                                if (error) {
                                                    console.log(error);

                                                    res.send({
                                                        "code": 400,
                                                        "message": "Failed to update last login time",
                                                    });
                                                }
                                                else {
                                                    var userDetails = [{
                                                        //  ROLE_ID: results1[0].ROLE_ID,
                                                        // BRANCH_ID: results1[0].BRANCH_ID,
                                                        //  NAME: results1[0].NAME,
                                                        USER_KEY: userKey
                                                    }]
                                                    let dtsend = rsa.encriptData(userDetails)
                                                    res.send({
                                                        "code": 200,
                                                        "data": dtsend
                                                    })
                                                    // db.executeQueryData(`update user`)

                                                    //generateToken(results1[0].ID, req, res, userDetails);

                                                }
                                            })
                                            ///sjgdug
                                        }
                                    })
                                }
                                else {
                                    res.send({
                                        "code": 400,
                                        "message": "it seems you already logged-In"
                                    })
                                }
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

function generateToken(userId, req, res, resultsUser) {
    const supportKey = req.headers['supportKey'];
    try {

        let key = genrateRandomKey(32)

        console.log(key);
        db.executeQueryData(`update user_key_master set USER_KEY = '${key}' where 1 AND USER_ID = ?`, [userId], supportKey, (error) => {
            if (error) {
                console.log("error", error);
                res.send({
                    "code": 400,
                    "message": "failed"
                })
            }
            else {
                res.send({
                    "code": 200,
                    "data": [{
                        "UsersData": resultsUser,
                        "key": key
                    }]
                })
            }
        })



    } catch (error) {
        console.log(error);
    }
}


function genrateRandomKey(length, supportKey, ) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$-#@&';
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
    

}


exports.getUserIdByKey = (req, res) =>{
   const supportKey = req.headers['supportkey'];
    let dt = rsa.decriptData(req.body.data)
   db.executeQueryData(`select * from view_user_master where ID = (select USER_ID from user_key_master where USER_KEY = ?)`, [dt.USER_KEY], supportKey, (error, reslt)=>{
        if(error)
        {
            console.log("error");
            res.send({
                "code": 400,
                "message": "Failed to get data for UserID"
            })
        }
        else{
            console.log("here is result od call - ",reslt);
                 

            let eData ='' ;
            if(reslt[0])
            {
              eData  = rsa.encriptData(reslt[0])
            }
            
            res.send({
                "code" : 200,
                "message": "ok",
                "data": eData
            }) 
        }
   })
}