const mysql = require('mysql2/promise');
const config = require('./config').config
const axios = require('axios');
const db = require('../../utilities/dbModule');

let connection

const mode = config.mode;

function connect() {
    let promise = new Promise(async (resolve, reject) => {
        try {
            const database = {
                user: config[mode].database_config.user,
                password: config[mode].database_config.password,
                database: config[mode].database_config.database_name,
                host: config[mode].database_config.host,
                namedPlaceholders: true
            }
            connection = await mysql.createConnection(database);

            resolve(connection)
        }
        catch (error) {
            // console.log(error);
            reject(error);
        }

    })

    return promise;
}


let proxy = {
    host: '127.0.0.1',
    port: 8080
}


async function getJWTToken() {

    if (!connection) {
        await connect();
    }

    let maxID

    const table = `jwt_token`;

    let get_max_id = `SELECT ID FROM ${table} ORDER BY ID DESC LIMIT 0, 1`;

    let token = ``

    let promise = new Promise(async (resolve, reject) => {
        try {
            let [max_query_result, max_query_fields] = await connection.execute(get_max_id);

            if (max_query_result.length > 0) {
                // console.log(max_query_result);
                maxID = max_query_result[0].ID;
                let get_query = `select TOKEN from ${table} where ID = ${maxID} AND IS_EXPIRED = 0;`
                let [get_token_result, get_token_fields] = await connection.execute(get_query);

                if (get_token_result.length > 0) {
                    token = get_token_result[0].TOKEN;
                    resolve(token);
                }
                else {
                    token = await generateToken()
                    resolve(token);
                }
            }
            else {
                token = await generateToken()
                resolve(token);
            }
        }
        catch (error) {
            // console.log(error);
            reject(error);
        }
    });

    return promise;
}


async function generateToken() {
    const table = `jwt_token`;

    if (!connection) {
        await connect();
    }

    setData = {
        CREATED_DATE: '22/10/2023',
        TOKEN: '',
        IS_EXPIRED: 0
    }

    let tokenurl = `${config[mode].api.host}:${config[mode].api.port}${config[mode].api.routes[0].url}`

    let promise = new Promise(async (resolve, reject) => {
        try {
            let token_result = await getRequest(tokenurl, { proxy: proxy });

            let token = token_result.token;

            setData.TOKEN = token;
            // console.log("real token", token, setData)

            let insert_query = `insert into ${table} set CREATED_DATE = '${setData.CREATED_DATE}', TOKEN = '${setData.TOKEN}' ,IS_EXPIRED = '${setData.IS_EXPIRED}'`;

            await connection.execute(insert_query);

            resolve(token);

        }
        catch (error) {
            // console.log(error)
            reject(error);
        }
    });

    return promise;
}


function getRequest(url, config) {

    let promise = new Promise(async (resolve, reject) => {
        try {
            let result = await axios.get(url, config);
            // // console.log("result",result)
            resolve(result.data);
        }
        catch (error) {
            // console.log(error);
            reject(error);
        }
    });

    return promise;
}


async function cacheMasters() {

    if (!connection) {
        await connect();
    }

    let masters_table = `masters_list`;

    let getmasterQ = `select * from ${masters_table} where IS_ACTIVE = 1`;

    let [masters_data, masters_fields] = await connection.execute(getmasterQ);

    // console.log("Masters Data", masters_data);



    for (let table of masters_data) {// console
        let checkQ = `SHOW TABLES LIKE '${table.NAME}'`;

        let [checkR, checkF] = await connection.execute(checkQ);

        // console.log('table name : ', table.NAME, 'result : ', checkR);

        if (checkR.length > 0) {
            let dropQ = `DROP TABLE ${table.NAME}`
            await connection.execute(dropQ);
        }


        let masterUrl = `${config[mode].api.host}:${config[mode].api.port}${config[mode].api.routes[1].url}${table.ID}`

        let bearerKey = await getJWTToken();
        let masterResult = await getRequest(masterUrl, { headers: { "Authorization": `Bearer ${bearerKey}` }, proxy: proxy });

        // console.log("masterResult", masterResult);

        for (let result of masterResult) {
            // let checkQ2 = `SHOW TABLES LIKE '${table.NAME}'`;

            let [checkR2, checkF2] = await connection.execute(checkQ);

            if (checkR2.length == 0) {
                let createTableQ = `CREATE TABLE ${table.NAME}(ID INT UNSIGNED NOT NULL AUTO_INCREMENT, ${returnUniqueKey(masterResult)} PRIMARY KEY (\`ID\`))`;
                console.log('table name : ', table.NAME, 'result : ', checkR2);

                let createTableR = await connection.execute(createTableQ);

                // console.log("query", createTableQ, "result", createTableR);
            }

            let insertQ = `INSERT INTO ${table.NAME} set ${returnInsertQ(result)}`
            let insertR = await connection.execute(insertQ);

            console.log("query", insertQ, "result", insertR);
        }

    }

}

function returnUniqueKey(arr) {
    let res = ''
    if (arr.length != 0) {
        let keys = Object.keys(arr[0]);

        for (let key of keys) {
            res += `${key} TEXT,`
        }

    }

    return res
}

function returnInsertQ(obj) {
    let q = ''

    for (let key of Object.keys(obj)) {
        q += `${key} = \"${obj[key]}\",`
    }

    q = q.slice(0, -1);

    console.log("insert q", q)

    return q;

}

// cacheMasters();

exports.onBoardCustomer = async (req, res) => {

    let applicant_id = req.body.APPLICANT_ID;

    if (!connection) {
        await connect();
    }

    let basicT = `basic_details`
    let personalT = `applicants_personal_details`
    let depositT = `term_deposite`
    let documentT = `applicant_documents`

    let basicQ = `select * from ${basicT} where ID = ${applicant_id};`;
    let personalQ = `select * from ${personalT} where APPLICANT_ID = ${applicant_id} AND APPLICANT_NO = 1;`;
    let depositQ = `select * from ${depositT} where APPLICANT_ID = ${applicant_id};`;
    let documentQ = `select * from ${documentT} where APPLICANT_ID = ${applicant_id} AND APPLICANT_NO = 1;`;

    let [basicR, basicF] = await db.executeQueryAsyncAwait(basicQ, '');
    let [personalR, personalF] = await db.executeQueryAsyncAwait(personalQ, '');
    let [depositR, depositF] = await db.executeQueryAsyncAwait(depositQ, '');
    let [documentR, documentF] = await db.executeQueryAsyncAwait(documentQ, '');

    console.log("basicR", basicR);
    console.log("personalR", personalR);
    console.log("depositR", depositR);
    console.log("documentR", documentR);

    let username = await getUserNameByID(14);

    res.send({
        "code": 200,
        "data": username
    })

    let account_opening_data = {
        "custobj": {
            "introbranch": basicR.CREATED_BRANCH_ID, //master need to be created,need to be discuss with list they have not added this master.

            "typeofcustomer": 1, //master and field need to be added.

            "middlename": personalR.LAST_NAME,
            "firstname": personalR.MIDDLE_NAME,
            "lastname": personalR.FIRST_NAME,

            "createdfor": "S", //need to be discuss with list

            "minor": personalR.IS_MINOR ? "Y" : "N",

            "birthdate": convertDate(personalR.DATE_OF_BIRTH),

            "gender": personalR.GENDER, //need to be discuss with list about values for genders.

            "occupationid": personalR.PROFESSION, //master need to be created

            "idtproofid": 1, //need to disscuss with omkar sir   (this is master).
            "idtproofidno": "1234", //need to disscuss with omkar sir
            "proofdetailsid": 2, //need to disscuss with omkar sir   (this is master).
            "addproofidno": "4321", //need to disscuss with omkar sir

            "riskcat": personalR.RISK_CATEGORY, //master need to be created

            "panno": personalR.PAN_NO, //need to discuss with omkar sir about making this field mendetory

            "fatherspouse": "F", //field need to be added

            "bankcode": 1,

            "brncode": basicR.CREATED_BRANCH_ID, //master need to be created

            "entrystatus": "F",  //need to be discuss with list

            "entryuser": getUserNameByID(basicR.MAKER_USER_ID), //master need to be created
            "verifiedby": getUserNameByID(basicR.CHACKER_USER_ID), //master need to be created
            "authuser": getUserNameByID(basicR.VERIFIER_USER_ID) //master need to be created
        },
        "addobj_P": {
            "addresstype": "P",

            "regionid": 1, //master need to be created, not mendetory
            "countryid": 356,//constant
            "stateid": 21,//master need to be created
            "districtid": 16,//master need to be created
            "talukaid": 1,//master need to be created
            "cityid": 1,//master need to be created
            "areaid": 1,//master need to be created 

            "mobile": personalR.MOBILE_NUMBER,
            "pincode": personalR.PERMANENT_PINCODE,

            // "sequenceno": 1,//need to discuss with list

            "bankcode": 1,

            "brncode": basicR.CREATED_BRANCH_ID,//master need to be created
            "entrystatus": "F",

            "entryuser": getUserNameByID(basicR.MAKER_USER_ID),//master need to be created
            "verifiedby": getUserNameByID(basicR.CHACKER_USER_ID),//master need to be created
            "authuser": getUserNameByID(basicR.VERIFIER_USER_ID)//master need to be created
        },
        "addobj_C": {
            "addresstype": "C",

            "regionid": 1,//master need to be created, not mendetory

            "countryid": 356,//constant

            "stateid": 21,//master need to be created
            "districtid": 16,//master need to be created
            "talukaid": 1,//master need to be created
            "cityid": 1,//master need to be created

            "areaid": 1,//master need to be created

            "mobile": personalR.MOBILE_NUMBER,
            "pincode": personalR.CURRENT_PINCODE,

            // "sequenceno": 1,//need to discuss with list

            "bankcode": 1,

            "brncode": basicR.CREATED_BRANCH_ID,//master need to be created

            "entryuser": getUserNameByID(basicR.MAKER_USER_ID),//master need to be created
            "verifiedby": getUserNameByID(basicR.CHACKER_USER_ID),//master need to be created
            "authuser": getUserNameByID(basicR.VERIFIER_USER_ID)//master need to be created
        },
        "kyccomobj": {
            "kcc_status": "F",

            "entryuser": getUserNameByID(basicR.MAKER_USER_ID),//master need to be created
            "verifiedby": getUserNameByID(basicR.CHACKER_USER_ID),//master need to be created

            "bankcode": 1,
            "brncode": basicR.CREATED_BRANCH_ID//master need to be created
        },
        "kyccompdtlrobj": {

            // "kcd_srno": 1,//need to discuss with list


            "kcd_addproff": 1,  //need to discuss with omkar sir
            "kcd_addidno": 1, //need to discuss with omkar sir
            "kcd_idproof": 1, //need to discuss with omkar sir
            "kcd_ididno": 1, //need to discuss with omkar sir

            "bankcode": 1,
            "brncode": basicR.CREATED_BRANCH_ID
        },
        "acmst_obj": {
            // "interestrate": 5, //need to ask to list

            "schemecode": depositR.ACCOUNT_TYPE,

            "acctitle": personalR.FIRST_NAME, //need to be discuss with list

            "jointacc": "N", //default "N" for now

            "constitution": 1, //master need to be created and field need to be added

            "operinstructions": 1, //need to discuss with omkar sir

            "paymentinstructions": 1, //need to discuss with omkar sir

            "entrystatus": "F",

            "entryuser": getUserNameByID(basicR.MAKER_USER_ID),
            "verifiedby": getUserNameByID(basicR.CHACKER_USER_ID),
            "authuser": getUserNameByID(basicR.VERIFIER_USER_ID),

            // "changeno": 1,//need to discuss with list

            "bankcode": 1,

            "brncode": basicR.CREATED_BRANCH_ID,

            "acctobeopn_atbrncd": basicR.CREATED_BRANCH_ID,
            "accopened_atbrn": basicR.CREATED_BRANCH_ID,

            "accopendt": generateNewDate(),

            "opnormdf": "A"//need to discuss with list
        },
        "accdtl_obj": {
            "schemecode": depositR.ACCOUNT_TYPE, //master need to be added

            // "serialno": 1,//need to discuss with list
            "changeno": 1,//need to discuss with list
            "bankcode": 1,

            "brncode": basicR.CREATED_BRANCH_ID,
            "acctobeopn_atbrncd": basicR.CREATED_BRANCH_ID,
            "accopened_atbrn": basicR.CREATED_BRANCH_ID
        },
        "docdtl_obj": {
            "schemecode": depositR.ACCOUNT_TYPE, //master need to be added

            "docid": 1, //need to discuss with list

            "changeno": 1,//need to discuss with list

            "bankcode": 1,

            "brncode": basicR.CREATED_BRANCH_ID,//master need to be created
            "acctobeopn_atbrncd": basicR.CREATED_BRANCH_ID,//master need to be created
            "accopened_atbrn": basicR.CREATED_BRANCH_ID//master need to be created
        },
        "m_kcd_iddocimage": "", //need to be added, discuss with omkar sir. need to be mendetory
        "m_kcd_adddocimage": "",//need to be added, discuss with omkar sir. need to be mendetory
        "m_kcd_photo": "" //from doc master

        // note : need to discuss with list about how are they going to handle existing customer.

        // note : we should mail field need to be discussed and wait for their answer rether then condunting meeting. 
    }
}


function convertDate(date, srcFormate = 'dd/mm/yyyy') {

}

function generateNewDate() {

}

async function getUserNameByID(id) {
    let getUserQ = `select NAME from user_master where ID = ${id}`;

    let [userR, userF] = await db.executeQueryAsyncAwait(getUserQ, '');

    console.log("userR", userR);

    if (userR) {
        return userR.NAME ? userR.NAME : '-';
    }
    else {
        return '-';
    }
}

exports.getMasters = async (req, res) => {

    try {

        if (!connection) {
            await connect();
        }


        let masterCode = req.body.code;

        let result = []

        let masterQ = `select NAME from masters_list where ID = ${masterCode}`


        let [masterR, masterF] = await connection.execute(masterQ, '');

        console.log("userR", masterR);

        let table_name = ``

        if (masterR) {
            if (masterR.NAME) {
                table_name = masterR.NAME;

                let getMasterQ = `select * from ${table_name}`

                result = await connection.query(getMasterQ);

                res.send({
                    "code": 200,
                    "data": result
                })

            }

            else {
                res.send({
                    "code": 200,
                    "message": "no data",
                    "data": []
                });
            }

        }
        else {
            res.send({
                "code": 200,
                "message": "no data",
                "data": []
            })
        }
    }

    catch (error) {
        console.log(error);
        res.send({
            "code": 400,
            "message": "failed"
        })
    }


}
