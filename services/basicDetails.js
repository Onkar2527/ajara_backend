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

        CREATED_BRANCH_ID: req.body.CREATED_BRANCH_ID,
        MAKER_USER_ID: req.body.MAKER_USER_ID,
        CHACKER_USER_ID: req.body.CHACKER_USER_ID,
        VERIFIER_USER_ID: req.body.VERIFIER_USER_ID,
        TRACK_ID: req.body.TRACK_ID,

        IS_OLD_CUSTOMER_3: req.body.IS_OLD_CUSTOMER_3,
        CUSTOMER_ID_3: req.body.CUSTOMER_ID_3,
        CKYC_NUMBER_3: req.body.CKYC_NUMBER_3,
        VOTER_ID_3: req.body.VOTER_ID_3,
        LICENSE_NO_3: req.body.LICENSE_NO_3,
        CUSTOMER_TYPE_3: req.body.CUSTOMER_TYPE_3,

        IS_OLD_CUSTOMER_4: req.body.IS_OLD_CUSTOMER_4,
        CUSTOMER_ID_4: req.body.CUSTOMER_ID_4,
        CKYC_NUMBER_4: req.body.CKYC_NUMBER_4,
        VOTER_ID_4: req.body.VOTER_ID_4,
        LICENSE_NO_4: req.body.LICENSE_NO_4,
        CUSTOMER_TYPE_4: req.body.CUSTOMER_TYPE_4,
        FILLED_DATE_TIME: req.body.FILLED_DATE_TIME,
        VERIFIED_DATE_TIME: req.body.VERIFIED_DATE_TIME,

        DOB_1: req.body.DOB_1,
        GENDER_1: req.body.GENDER_1,
        MOBILE_1: req.body.MOBILE_1,
        AGE_1: req.body.AGE_1,

        DOB_2: req.body.DOB_2,
        GENDER_2: req.body.GENDER_2,
        MOBILE_2: req.body.MOBILE_2,
        AGE_2: req.body.AGE_2,

        DOB_3: req.body.DOB_3,
        GENDER_3: req.body.GENDER_3,
        MOBILE_3: req.body.MOBILE_3,
        AGE_3: req.body.AGE_3,

        DOB_4: req.body.DOB_4,
        GENDER_4: req.body.GENDER_4,
        MOBILE_4: req.body.MOBILE_4,
        AGE_4: req.body.AGE_4,

        OTP_AUTH_1: req.body.OTP_AUTH_1,
        OTP_AUTH_2: req.body.OTP_AUTH_2,

        VOTER_ID_2: req.body.VOTER_ID_2,
        VOTER_ID_1: req.body.VOTER_ID_1,

        LICENSE_NO_1: req.body.LICENSE_NO_1,
        LICENSE_NO_2: req.body.LICENSE_NO_2,

        DOCUMENTS_AUTHORITY: req.body.DOCUMENTS_AUTHORITY,
        DOCUMENTS_ISSUE_PLACE: req.body.DOCUMENTS_ISSUE_PLACE,
    }

    return data;

}

function cpcAccess(req) {
    let data = {
        VERIFIER_USER_ID: req.body.VERIFIER_USER_ID,
        TRACK_ID: req.body.TRACK_ID,
    }
    return data;
}

function checkerAccess(req) {
    let data = {
        // VERIFIER_USER_ID: req.body.VERIFIER_USER_ID,
        TRACK_ID: req.body.TRACK_ID,
        VERIFIED_DATE_TIME: req.body.VERIFIED_DATE_TIME
    }

    return data;
}

function getAllApplicantsInfo(req) {

    var data = [
        {
            FIRST_NAME: req.body.PRIMARY_APPLICANT_FIRST_NAME,
            APPLICANT_NO: 1,
            MIDDLE_NAME: req.body.PRIMARY_APPLICANT_MIDDLE_NAME,
            LAST_NAME: req.body.PRIMARY_APPLICANT_LAST_NAME,
            AADHAAR_NUMBER: req.body.AADHAAR_NO_1,
            APPLICANT_ID: req.body.ID,

            PAN_NO: req.body.PAN_NUMBER,
            DRIVING_LICENSE_NO: req.body.LICENSE_NO_1,
            VOTER_ID: req.body.VOTER_ID_1,

            DATE_OF_BIRTH: req.body.DOB_1,
            GENDER: req.body.GENDER_1,
            MOBILE_NUMBER: req.body.MOBILE_1
        },
        {
            FIRST_NAME: req.body.APPLICANT2_FIRST_NAME,
            APPLICANT_NO: 2,
            MIDDLE_NAME: req.body.APPLICANT2_MIDDLE_NAME,
            LAST_NAME: req.body.APPLICANT2_LAST_NAME,
            AADHAAR_NUMBER: req.body.AADHAAR_NO_2,
            APPLICANT_ID: req.body.ID,

            PAN_NO: req.body.PAN_NUMBER2,
            DRIVING_LICENSE_NO: req.body.LICENSE_NO_2,
            VOTER_ID: req.body.VOTER_ID_2,

            DATE_OF_BIRTH: req.body.DOB_2,
            GENDER: req.body.GENDER_2,
            MOBILE_NUMBER: req.body.MOBILE_2
        },
        {
            FIRST_NAME: req.body.APPLICANT3_FIRST_NAME,
            APPLICANT_NO: 3,
            MIDDLE_NAME: req.body.APPLICANT3_MIDDLE_NAME,
            LAST_NAME: req.body.APPLICANT3_LAST_NAME,
            AADHAAR_NUMBER: req.body.AADHAAR_NUMBER3,
            APPLICANT_ID: req.body.ID,

            PAN_NO: req.body.PAN_NUMBER3,
            DRIVING_LICENSE_NO: req.body.LICENSE_NO_3,
            VOTER_ID: req.body.VOTER_ID_3,

            DATE_OF_BIRTH: req.body.DOB_3,
            GENDER: req.body.GENDER_3,
            MOBILE_NUMBER: req.body.MOBILE_3
        },
        {
            FIRST_NAME: req.body.APPLICANT4_FIRST_NAME,
            APPLICANT_NO: 4,
            MIDDLE_NAME: req.body.APPLICANT4_MIDDLE_NAME,
            LAST_NAME: req.body.APPLICANT4_LAST_NAME,
            AADHAAR_NUMBER: req.body.AADHAAR_NUMBER4,
            APPLICANT_ID: req.body.ID,

            PAN_NO: req.body.PAN_NUMBER4,
            DRIVING_LICENSE_NO: req.body.LICENSE_NO_4,
            VOTER_ID: req.body.VOTER_ID_4,

            DATE_OF_BIRTH: req.body.DOB_4,
            GENDER: req.body.GENDER_4,
            MOBILE_NUMBER: req.body.MOBILE_4
        }
    ]

    return data
}

function getCommonApplicantInfo(req) {
    let data = {
        RISK_CATEGORY: 'A',
        RELIGION: 'A',
        CASTE: 'A',
        MARITAL_STATUS: 'M',
        EDUCATION: 'S',
        BLOOD_TYPE: 'A',
        GENDER: "M",
        GUARDIAN_RELATION: 'A',
        PROFESSION: ' ',
        NATURE_OF_SERVICE: ' ',
        SELF_EMPLOYED: ' ',
        NATURE_OF_BUSINESS: ' ',
        SOURCE_OF_FUNDS: ' ',
        NATIONALITY: 'A',
        FATHER_OR_SPOUSE: 'F'
    }

    return data;
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
    let commonFields = getCommonApplicantInfo(req);

    let supportKey = req.headers['supportkey'];

    let con = db.openConnection();

    console.log("data", data);
    console.log("applicants", allApplicants);

    data.MODIFIED_DATE = new Date();

    const q = `insert into basic_details set ?`


    try {


        let basicInsert = await db.executeQueryDataAsyncAwait(q, data, supportKey);

        const q_tab = `insert into frictionless_account_opening.extra_information (APPLICANT_ID, TAB_ID) select ${basicInsert.insertId}, ID from tab_master`

        await db.executeQueryAsyncAwait(q_tab, supportKey);


        for (let i = 1; i <= req.body.NO_OF_APPLICANT; i++) {
            let applicantQuery = `insert into ${applicant_table} set ? `
            let applicantPhotos = `insert into applicant_photos set ? `
            let applicantDocuments = `insert into applicant_documents (DOCUMENT_NAME,APPLICANT_ID,APPLICANT_NO) select DOCUMENT_NAME, ${basicInsert.insertId}, ${i}  from document_master ORDER BY SEQ_NO`

            allApplicants[i - 1]['APPLICANT_ID'] = basicInsert.insertId;
            docApplicants[i - 1]['APPLICANT_ID'] = basicInsert.insertId;

            allApplicants[i - 1] = { ...allApplicants[i - 1], ...commonFields };
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
    let commonFields = getCommonApplicantInfo(req);

    let ROLE_ID = req.body.ROLE_ID;

    let data = ``;

    if (ROLE_ID == 1) {

        data = reqData(req);
        if (data.TRACK_ID == 2)
            data.MODIFIED_DATE = new Date();
    }
    else if (ROLE_ID == 2) {
        data = checkerAccess(req);

        data.MODIFIED_DATE = new Date();
    }
    else if (ROLE_ID == 3) {
        data = cpcAccess(req);
        data.MODIFIED_DATE = new Date();
    }
    else {
        data = reqData(req);
    }

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

        if (ROLE_ID == 1) {
            for (let i = 1; i <= req.body.NO_OF_APPLICANT; i++) {
                let applicant = await db.executeQueryAsyncAwait(`select * from ${applicant_table} where APPLICANT_ID = ${req.body.ID} AND APPLICANT_NO = ${i}`);

                if (applicant.length == 0) {
                    let applicantQuery = `insert into ${applicant_table} set ? `
                    let applicantPhotos = `insert into applicant_photos set ? `
                    let applicantDocuments = `insert into applicant_documents (DOCUMENT_NAME,APPLICANT_ID,APPLICANT_NO) select DOCUMENT_NAME, ${req.body.ID}, ${i}  from document_master ORDER BY SEQ_NO`

                    allApplicants[i - 1] = { ...allApplicants[i - 1], ...commonFields };
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

function convertDate(date = null) {
    if (date)
        return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    else
        return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

exports.getAll = (req, res) => {

    let user_data = req.body.user_details;
    let userFilter = req.body.filter;

    let userFilterStr =
        `
    ${userFilter.BRANCH_ID ? ` AND CREATED_BRANCH_ID = ${userFilter.BRANCH_ID}` : ''}
    ${userFilter.TRACK_ID ? ` AND TRACK_ID = ${userFilter.TRACK_ID}` : ''}
    
    `

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

    let sortKey = req.body.sortKey ? req.body.sortKey : 'MODIFIED_DATE';
    let sortValue = req.body.sortValue ? req.body.sortValue : 'DESC';

    let filter = ``

    let criteria = '';


    let branchFilter = ` AND CREATED_BRANCH_ID = ${user_data.BRANCH_ID}`;

    let chakerFilter = ` AND MAKER_USER_ID = ${user_data.USER_ID} ${branchFilter}`;

    let makerFilter = ` AND CHACKER_USER_ID = ${user_data.USER_ID} ${branchFilter}`;

    let verifierFilter = ` ${userFilterStr} AND VERIFIER_USER_ID = ${user_data.USER_ID}  OR (ISNULL(VERIFIER_USER_ID) AND TRACK_ID = 3)`;

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

    console.log("Count C",criteria)

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