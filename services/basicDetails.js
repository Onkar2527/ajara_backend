const db = require('../utilities/dbModule');

const applicant_table = 'applicants_personal_details';

function reqData(req) {

    var data = {

        NO_OF_APPLICANT: req.body.NO_OF_APPLICANT,
        ACCOUNT_TYPE: req.body.ACCOUNT_TYPE,
        ACCOUNT_OPERATION: req.body.ACCOUNT_OPERATION,
        AADHAAR_NUMBER: req.body.AADHAAR_NUMBER,
        PAN_NUMBER: req.body.PAN_NUMBER,
        AADHAAR_NUMBER2: req.body.AADHAAR_NUMBER2,
        PAN_NUMBER2: req.body.PAN_NUMBER2,
        AADHAAR_NUMBER3: req.body.AADHAAR_NUMBER3,
        PAN_NUMBER3: req.body.PAN_NUMBER3,
        AADHAAR_NUMBER4: req.body.AADHAAR_NUMBER4,
        PAN_NUMBER4: req.body.PAN_NUMBER4,
        PRIMARY_APPLICANT_FIRST_NAME: req.body.PRIMARY_APPLICANT_FIRST_NAME,
        PRIMARY_APPLICANT_MIDDLE_NAME: req.body.PRIMARY_APPLICANT_MIDDLE_NAME,
        PRIMARY_APPLICANT_LAST_NAME: req.body.PRIMARY_APPLICANT_LAST_NAME,
        APPLICANT2_FIRST_NAME: req.body.APPLICANT2_FIRST_NAME,
        APPLICANT2_MIDDLE_NAME: req.body.APPLICANT2_MIDDLE_NAME,
        APPLICANT2_LAST_NAME: req.body.APPLICANT2_LAST_NAME,
        APPLICANT3_FIRST_NAME: req.body.APPLICANT3_FIRST_NAME,
        APPLICANT3_MIDDLE_NAME: req.body.APPLICANT3_MIDDLE_NAME,
        APPLICANT3_LAST_NAME: req.body.APPLICANT3_LAST_NAME,
        APPLICANT4_FIRST_NAME: req.body.APPLICANT4_FIRST_NAME,
        APPLICANT4_MIDDLE_NAME: req.body.APPLICANT4_MIDDLE_NAME,
        APPLICANT4_LAST_NAME: req.body.APPLICANT4_LAST_NAME,
        IS_MINOR: req.body.IS_MINOR ? '1' : '0',
        MINOR_DOB: req.body.MINOR_DOB,
        GUARDIAN_NAME: req.body.GUARDIAN_NAME,
        RELATION_WITH_MINOR: req.body.RELATION_WITH_MINOR,
        GUARDIAN_DOB: req.body.GUARDIAN_DOB,
        IS_INTRODUCED: req.body.IS_INTRODUCED ? '1' : 0,
        E_CUSTOMER_NAME: req.body.E_CUSTOMER_NAME,
        E_CUSTOMER_ID: req.body.E_CUSTOMER_ID,
        E_ACCOUNT_NUMBER: req.body.E_ACCOUNT_NUMBER,
        E_YEARS: req.body.E_YEARS,
        STATUS: req.body.STATUS,
        IS_OLD_CUSTOMER: req.body.IS_OLD_CUSTOMER ? '1' : '0',
        CUSTOMER_TYPE_1: req.body.CUSTOMER_TYPE_1,
        CUSTOMER_TYPE_2: req.body.CUSTOMER_TYPE_2,
        AADHAAR_NO_1: req.body.AADHAAR_NO_1,
        AADHAAR_NO_2: req.body.AADHAAR_NO_2,

        IS_OLD_CUSTOMER_1: req.body.IS_OLD_CUSTOMER_1,
        IS_OLD_CUSTOMER_2: req.body.IS_OLD_CUSTOMER_2,

        CUSTOMER_ID_2: req.body.CUSTOMER_ID_2,
        CKYC_NUMBER_2: req.body.CKYC_NUMBER_2,
        CUSTOMER_ID_1: req.body.CUSTOMER_ID_1,
        CKYC_NUMBER_1: req.body.CKYC_NUMBER_1,

        CREATED_BRANCH_ID : req.body.CREATED_BRANCH_ID,
        MAKER_USER_ID :req.body.MAKER_USER_ID,
        CHACKER_USER_ID : req.body.CHACKER_USER_ID,
        VERIFIER_USER_ID:req.body.VERIFIER_USER_ID,
        TRACK_ID:req.body.TRACK_ID
    }

    return data;

}

function getAllApplicantsInfo(req) {

    var data = [
        { FIRST_NAME: req.body.PRIMARY_APPLICANT_FIRST_NAME, APPLICANT_NO: 1, MIDDLE_NAME: req.body.PRIMARY_APPLICANT_MIDDLE_NAME, LAST_NAME: req.body.PRIMARY_APPLICANT_LAST_NAME, AADHAAR_NUMBER: req.body.AADHAAR_NO_1, APPLICANT_ID: req.body.ID },
        { FIRST_NAME: req.body.APPLICANT2_FIRST_NAME, APPLICANT_NO: 2, MIDDLE_NAME: req.body.APPLICANT2_MIDDLE_NAME, LAST_NAME: req.body.APPLICANT2_LAST_NAME, AADHAAR_NUMBER: req.body.AADHAAR_NO_2, APPLICANT_ID: req.body.ID },
        { FIRST_NAME: req.body.APPLICANT3_FIRST_NAME, APPLICANT_NO: 3, MIDDLE_NAME: req.body.APPLICANT3_MIDDLE_NAME, LAST_NAME: req.body.APPLICANT3_LAST_NAME, AADHAAR_NUMBER: req.body.AADHAAR_NUMBER3, APPLICANT_ID: req.body.ID },
        { FIRST_NAME: req.body.APPLICANT4_FIRST_NAME, APPLICANT_NO: 4, MIDDLE_NAME: req.body.APPLICANT4_MIDDLE_NAME, LAST_NAME: req.body.APPLICANT4_LAST_NAME, AADHAAR_NUMBER: req.body.AADHAAR_NUMBER3, APPLICANT_ID: req.body.ID }
    ]

    return data
}

function getAllApplicantDoc(req) {
    var data = [
        { FIRST_NAME: req.body.PRIMARY_APPLICANT_FIRST_NAME, APPLICANT_NO: 1, MIDDLE_NAME: req.body.PRIMARY_APPLICANT_MIDDLE_NAME, LAST_NAME: req.body.PRIMARY_APPLICANT_LAST_NAME, APPLICANT_ID: req.body.ID },
        { FIRST_NAME: req.body.APPLICANT2_FIRST_NAME, APPLICANT_NO: 2, MIDDLE_NAME: req.body.APPLICANT2_MIDDLE_NAME, LAST_NAME: req.body.APPLICANT2_LAST_NAME, APPLICANT_ID: req.body.ID },
        { FIRST_NAME: req.body.APPLICANT3_FIRST_NAME, APPLICANT_NO: 3, MIDDLE_NAME: req.body.APPLICANT3_MIDDLE_NAME, LAST_NAME: req.body.APPLICANT3_LAST_NAME, APPLICANT_ID: req.body.ID },
        { FIRST_NAME: req.body.APPLICANT4_FIRST_NAME, APPLICANT_NO: 4, MIDDLE_NAME: req.body.APPLICANT4_MIDDLE_NAME, LAST_NAME: req.body.APPLICANT4_LAST_NAME, APPLICANT_ID: req.body.ID }
    ]

    return data
}

exports.get = (req, res) => {

    let supportKey = req.headers['supportkey'];
    const q = `select * from basic_details where ID = ${req.body.ID}`
    db.executeQuery(q, supportKey, (error, results) => {
        if (error) {
            console.log("Error", error);
            res.send({
                "code": 400,
                "message": "Failed to get personal details "
            })
        }
        else {
            res.send({
                "code": 200,
                "message": "OK",
                "data": results
            })

        }
    })



}

exports.create = async (req, res) => {

    let data = reqData(req);
    let allApplicants = getAllApplicantsInfo(req);
    let docApplicants = getAllApplicantDoc(req);
    let supportKey = req.headers['supportkey'];

    let con = db.openConnection();

    console.log("data", data);
    console.log("applicants", allApplicants);

    const q = `insert into basic_details set ?`


    try {
        let basicInsert = await db.executeQueryDataAsyncAwait(q, data, supportKey);

        const q_tab = `insert into frictionless_account_opening.extra_information (APPLICANT_ID, TAB_ID) select ${basicInsert.insertId}, ID from tab_master`

        await db.executeQueryAsyncAwait(q_tab, supportKey);


        for (let i = 1; i <= req.body.NO_OF_APPLICANT; i++) {
            let applicantQuery = `insert into ${applicant_table} set ? `
            let applicantPhotos = `insert into applicant_photos set ? `
            let applicantDocuments = `insert into applicant_documents (DOCUMENT_NAME,APPLICANT_ID,APPLICANT_NO) select DOCUMENT_NAME, ${basicInsert.insertId}, ${i}  from document_master `

            allApplicants[i - 1]['APPLICANT_ID'] = basicInsert.insertId;
            docApplicants[i - 1]['APPLICANT_ID'] = basicInsert.insertId;
            await db.executeQueryDataAsyncAwait(applicantQuery, allApplicants[i - 1], supportKey);
            await db.executeQueryDataAsyncAwait(applicantPhotos, docApplicants[i - 1], supportKey);
            await db.executeQueryAsyncAwait(applicantDocuments, supportKey);
        }

        db.commitConnection(con)
        res.send({
            "code": 200,
            "message": "Basic details saved successfully",
            "APPLICANT_ID": basicInsert.insertId
        })

    }
    catch (error) {
        console.log("error", error);
        db.rollbackConnection(con)
        res.send({
            "code": 400,
            "message": "Failed to save basic details"
        })
    }

}


exports.update1 = async (req, res) => {
    const supportKey = req.headers['supportkey'];
    let con = db.openConnection();
    let allApplicants = getAllApplicantsInfo(req);
    let docApplicants = getAllApplicantDoc(req);


    const data = reqData(req);
    let setData = '';
    let recData = [];

    Object.keys(data).forEach(key => {
        setData += `${key} = ? ,`;
        recData.push(data[key]);
    });

    setData2 = setData.slice(0, -1);

    console.log("dtttt ", setData2);

    const q = `update basic_details set ${setData2} where ID = ${req.body.ID}`

    try {
        await db.executeQueryDataAsyncAwait(q, recData, supportKey);

        for (let i = 1; i <= req.body.NO_OF_APPLICANT; i++) {
            let applicant = await db.executeQueryAsyncAwait(`select * from ${applicant_table} where APPLICANT_ID = ${req.body.ID} AND APPLICANT_NO = ${i}`);

            if (applicant.length == 0) {
                let applicantQuery = `insert into ${applicant_table} set ? `
                let applicantPhotos = `insert into applicant_photos set ? `
                let applicantDocuments = `insert into applicant_documents (DOCUMENT_NAME,APPLICANT_ID,APPLICANT_NO) select DOCUMENT_NAME, ${req.body.ID}, ${i}  from document_master `

                await db.executeQueryDataAsyncAwait(applicantQuery, allApplicants[i - 1], supportKey);
                await db.executeQueryDataAsyncAwait(applicantPhotos, docApplicants[i - 1], supportKey);
                await db.executeQueryAsyncAwait(applicantDocuments, supportKey);
            }

            else if (applicant.length > 0) {

                let applicantsPersonalfeilds = '';
                let applicantsPersonalArray = [];

                // console.log("applicant ",allApplicants[i-1])
                Object.keys(allApplicants[i - 1]).forEach(key => {
                    applicantsPersonalfeilds += `${key} = ? ,`;
                    applicantsPersonalArray.push(allApplicants[i - 1][key]);
                });

                applicantsPersonalfeilds = applicantsPersonalfeilds.slice(0, -1)


                let applicantsPhotofeilds = '';
                let applicantsPhototArray = [];

                // console.log("applicant ",allApplicants[i-1])
                Object.keys(docApplicants[i - 1]).forEach(key => {
                    applicantsPhotofeilds += `${key} = ? ,`;
                    applicantsPhototArray.push(docApplicants[i - 1][key]);
                });

                applicantsPhotofeilds = applicantsPhotofeilds.slice(0, -1);

                let applicantQuery = `update ${applicant_table} set ${applicantsPersonalfeilds} where ID = ${applicant[0].ID} `
                let applicantPhotos = `update applicant_photos set ${applicantsPhotofeilds} where APPLICANT_ID = ${req.body.ID} AND APPLICANT_NO = ${i} `

                await db.executeQueryDataAsyncAwait(applicantQuery, applicantsPersonalArray, supportKey);
                await db.executeQueryDataAsyncAwait(applicantPhotos, applicantsPhototArray, supportKey);
            }
        }

        res.send({
            "code": 200,
            "message": "bascic details update successfully"
        })

    }
    catch (error) {
        console.log(error);
        db.rollbackConnection(con)
        res.send({
            "code": 400,
            "message": "Failed to update personal_information."
        })
    }
}

exports.update = (req, res) => {
    const supportKey = req.headers['supportkey'];


    const data = reqData(req);
    let setData = '';
    let recData = [];

    Object.keys(data).forEach(key => {
        setData += `${key} = ?,`;
        recData.push(data[key]);
    });

    setData2 = setData.slice(0, -1)

    const q = `update basic_details set ${setData2} where ID = ${req.body.ID}`
    db.executeQueryData(q, recData, supportKey, (error) => {
        if (error) {
            console.log(error);
            res.send({
                "code": 400,
                "message": "Failed to update basic form details"
            })

        }
        else {
            res.send({
                "code": 200,
                "message": "basic details updated successfully"
            })

        }

    })


}

exports.getAll = (req, res) => {

    let user_data = req.body.user_details;

    const supportKey = req.header['supportkey'];

    var pageIndex = req.body.pageIndex ? req.body.pageIndex : '';

    var pageSize = req.body.pageSize ? req.body.pageSize : '';
    var start = 0;
    var end = 0;

    console.log(pageIndex + " " + pageSize)
    if (pageIndex && pageSize) {
        start = (pageIndex - 1) * pageSize;
        end = pageSize;
        console.log(start + " " + end);
    }

    let sortKey = req.body.sortKey ? req.body.sortKey : 'ID';
    let sortValue = req.body.sortValue ? req.body.sortValue : 'DESC';

    let filter = ``

    let criteria = '';


    let branchFilter = ` AND CREATED_BRANCH_ID = ${user_data.BRANCH_ID}`;

    let chakerFilter = ` AND MAKER_USER_ID = ${user_data.USER_ID} ${branchFilter}`;

    let makerFilter = ` AND CHACKER_USER_ID = ${user_data.USER_ID} ${branchFilter}`;

    let verifierFilter = ` AND VERIFIER_USER_ID = ${user_data.USER_ID}`;

    if (user_data.ROLE_ID == 1) {
        filter = chakerFilter;
    }

    else if (user_data.ROLE_ID == 2) {
        filter = makerFilter;
    }

    else if (user_data.ROLE_ID == 3) {
        filter = verifierFilter;
    }

    if (pageIndex && pageSize)
        criteria = filter + "  order by " + sortKey + " " + sortValue + " LIMIT " + start + "," + end;
    else
        criteria = filter + "  order by " + sortKey + " " + sortValue;

    let countCriteria = filter;

    db.executeQuery(`select count(*) as cnt from basic_details where 1 ` + countCriteria, supportKey, (error, resultCount) => {
        if (error) {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "failed to get proposal count"
            })
        }
        else {
            db.executeQuery(`select * from basic_details where 1 ` + criteria, supportKey, (error, results) => {
                if (error) {
                    console.log("error", error);
                    res.send({
                        "code": 400,
                        "message": "Failed to get drafts"
                    })
                }
                else {
                    console.log("count,data");
                    res.send({
                        "code": 200,
                        "message": "ok",
                        "count": resultCount[0] ? resultCount[0].cnt : 0,
                        "data": results
                    })
                }
            })
        }
    })



}