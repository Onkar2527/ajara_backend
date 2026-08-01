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
        IS_MINOR: (
            req.body.IS_MINOR == 1 ||
            req.body.IS_MINOR == '1' ||
            req.body.IS_MINOR == true ||
            req.body.IS_MINOR == 'true' ||
            req.body.IS_MINOR == 'Y' ||
            req.body.CUSTOMER_TYPE_1 == 'MNR' ||
            req.body.CUSTOMER_TYPE_1 == 'MINOR' ||
            (req.body.AGE_1 !== undefined && req.body.AGE_1 !== null && req.body.AGE_1 !== '' && parseInt(req.body.AGE_1) < 18) ||
            (req.body.AGE !== undefined && req.body.AGE !== null && req.body.AGE !== '' && parseInt(req.body.AGE) < 18) ||
            (req.body.MINOR_DOB && req.body.MINOR_DOB !== '') ||
            (req.body.GUARDIAN_NAME && req.body.GUARDIAN_NAME !== '') ||
            (req.body.RELATION_WITH_MINOR && req.body.RELATION_WITH_MINOR !== '') ||
            (Array.isArray(req.body.applicants) && req.body.applicants.length > 0 && (
                req.body.applicants[0].IS_MINOR == 1 ||
                req.body.applicants[0].IS_MINOR == '1' ||
                req.body.applicants[0].IS_MINOR == true ||
                req.body.applicants[0].IS_MINOR == 'Y' ||
                (req.body.applicants[0].AGE !== undefined && req.body.applicants[0].AGE !== null && req.body.applicants[0].AGE !== '' && parseInt(req.body.applicants[0].AGE) < 18) ||
                (req.body.applicants[0].DOB && req.body.applicants[0].DOB.includes('/') && parseInt(req.body.applicants[0].DOB.split('/')[2]) > (new Date().getFullYear() - 18))
            ))
        ) ? '1' : '0',
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
        DOCUMENTS_AUTHORITY_1: req.body.DOCUMENTS_AUTHORITY_1,
        DOCUMENTS_AUTHORITY_2: req.body.DOCUMENTS_AUTHORITY_2,
        DOCUMENTS_AUTHORITY_3: req.body.DOCUMENTS_AUTHORITY_3,


        DOCUMENTS_ISSUE_PLACE: req.body.DOCUMENTS_ISSUE_PLACE,
        DOCUMENTS_ISSUE_PLACE_1: req.body.DOCUMENTS_ISSUE_PLACE_1,
        DOCUMENTS_ISSUE_PLACE_2: req.body.DOCUMENTS_ISSUE_PLACE_2,
        DOCUMENTS_ISSUE_PLACE_3: req.body.DOCUMENTS_ISSUE_PLACE_3,


        IS_AADHAAR_DBT: req.body.IS_AADHAAR_DBT,
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

function getAllApplicantsInfo(applicant, i) {

    const data = {
        FIRST_NAME: applicant.FIRST_NAME,
        APPLICANT_NO: i,
        MIDDLE_NAME: applicant.MIDDLE_NAME,
        LAST_NAME: applicant.LAST_NAME,
        AADHAAR_NUMBER: applicant.AADHAAR_NO,

        PAN_NO: applicant.PAN_NUMBER,
        DRIVING_LICENSE_NO: applicant.LICENSE_NO,
        VOTER_ID: applicant.VOTER_ID,

        DATE_OF_BIRTH: applicant.DOB,
        GENDER: applicant.GENDER,
        MOBILE_NUMBER: applicant.MOBILE,

        IS_MINOR: (
            applicant.IS_MINOR == 1 ||
            applicant.IS_MINOR == '1' ||
            applicant.IS_MINOR == true ||
            applicant.IS_MINOR == 'true' ||
            applicant.IS_MINOR == 'Y' ||
            (applicant.AGE !== undefined && applicant.AGE !== null && applicant.AGE !== '' && parseInt(applicant.AGE) < 18) ||
            (applicant.CUSTOMER_TYPE == 'MNR' || applicant.CUSTOMER_TYPE == 'MINOR') ||
            (applicant.DOB && applicant.DOB.includes('/') && parseInt(applicant.DOB.split('/')[2]) > (new Date().getFullYear() - 18))
        ) ? 1 : 0
    }

    // Added defensive checks to prevent overwriting with NULL if fields are missing from the request (Refill fix) - 2026-04-17
    if (applicant.RELIGION !== undefined) data.RELIGION = applicant.RELIGION;
    if (applicant.CASTE !== undefined) data.CASTE = applicant.CASTE;
    if (applicant.PROFESSION !== undefined) data.PROFESSION = applicant.PROFESSION;
    if (applicant.NATURE_OF_SERVICE !== undefined) data.NATURE_OF_SERVICE = applicant.NATURE_OF_SERVICE;
    if (applicant.SELF_EMPLOYED !== undefined) data.SELF_EMPLOYED = applicant.SELF_EMPLOYED;
    if (applicant.NATURE_OF_BUSINESS !== undefined) data.NATURE_OF_BUSINESS = applicant.NATURE_OF_BUSINESS;
    if (applicant.SOURCE_OF_FUNDS !== undefined) data.SOURCE_OF_FUNDS = applicant.SOURCE_OF_FUNDS;
    if (applicant.SPECIAL_CATEGORY !== undefined) data.SPECIAL_CATEGORY = applicant.SPECIAL_CATEGORY;
    if (applicant.RISK_CATEGORY !== undefined) data.RISK_CATEGORY = applicant.RISK_CATEGORY;
    if (applicant.CONSTITUTION !== undefined) data.CONSTITUTION = applicant.CONSTITUTION; // Added missing CONSTITUTION field
    if (applicant.IS_DISABLED !== undefined) data.IS_DISABLED = applicant.IS_DISABLED ? 1 : 0;
    if (applicant.TYPE_OF_DISABILITY !== undefined) data.TYPE_OF_DISABILITY = applicant.TYPE_OF_DISABILITY;
    if (applicant.DISABILITY_PERCENTAGE !== undefined) data.DISABILITY_PERCENTAGE = applicant.DISABILITY_PERCENTAGE;
    if (applicant.UDID_NO !== undefined) data.UDID_NO = applicant.UDID_NO;

    return data
}

function getCommonApplicantInfo() {
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

exports.get = async (req, res) => {
    const supportKey = req.headers['supportkey'];
    const q = `select * from basic_details where ID = ?`;
    try {
        const results = await db.executeQueryData(q, [req.body.ID], supportKey);
        if (results.length > 0) {
            // Fetch the latest applicant details from dedicated table to stay in sync - 2026-04-17
            let applicantsQ = `select * from applicants_personal_details where APPLICANT_ID = ? order by APPLICANT_NO`;
            let personalResults = await db.executeQueryData(applicantsQ, [req.body.ID], supportKey);

            if (results[0].APPLICANTS_DATA) {
                try {
                    // Try parsing APPLICANTS_DATA if it's a string
                    let applicantsJson = typeof results[0].APPLICANTS_DATA === 'string' ? JSON.parse(results[0].APPLICANTS_DATA) : results[0].APPLICANTS_DATA;

                    // Merge JSON data with DB data to ensure personal info fields are populated
                    if (personalResults.length > 0) {
                        applicantsJson = applicantsJson.map((app, index) => {
                            let dbApp = personalResults.find(pa => pa.APPLICANT_NO === (index + 1));
                            if (dbApp) {
                                return {
                                    ...app,
                                    RELIGION: dbApp.RELIGION,
                                    CASTE: dbApp.CASTE,
                                    PROFESSION: dbApp.PROFESSION,
                                    NATURE_OF_SERVICE: dbApp.NATURE_OF_SERVICE,
                                    SELF_EMPLOYED: dbApp.SELF_EMPLOYED,
                                    NATURE_OF_BUSINESS: dbApp.NATURE_OF_BUSINESS,
                                    SOURCE_OF_FUNDS: dbApp.SOURCE_OF_FUNDS,
                                    SPECIAL_CATEGORY: dbApp.SPECIAL_CATEGORY,
                                    RISK_CATEGORY: dbApp.RISK_CATEGORY,
                                    CONSTITUTION: dbApp.CONSTITUTION,
                                    DOB: dbApp.DATE_OF_BIRTH,
                                    MOBILE: dbApp.MOBILE_NUMBER,
                                    GENDER: dbApp.GENDER,
                                    IS_DISABLED: dbApp.IS_DISABLED,
                                    TYPE_OF_DISABILITY: dbApp.TYPE_OF_DISABILITY,
                                    DISABILITY_PERCENTAGE: dbApp.DISABILITY_PERCENTAGE,
                                    UDID_NO: dbApp.UDID_NO
                                };
                            }
                            return app;
                        });
                    }
                    results[0].applicants = applicantsJson;
                } catch (e) {
                    console.error("Error parsing APPLICANTS_DATA in get:", e);
                    results[0].applicants = results[0].APPLICANTS_DATA;
                }
            }
        }
        res.send({
            "code": 200,
            "message": "OK",
            "data": results
        });
    } catch (error) {
        console.log("Error", error);
        res.status(400).send({
            "code": 400,
            "message": "Failed to get personal details"
        });
    }
};

exports.create = async (req, res) => {
    let data = reqData(req);
    const applicants = req.body.applicants;
    data.APPLICANTS_DATA = JSON.stringify(applicants);
    let supportKey = req.headers['supportkey'];
    let connection;

    try {
        connection = await db.openConnection();
        data.MODIFIED_DATE = new Date();
        const q = `insert into basic_details set ?`;
        let basicInsert = await db.executeQueryData(q, data, supportKey);
        const proposalId = basicInsert.insertId;

        const q_tab = `insert into extra_information (APPLICANT_ID, TAB_ID) select ${proposalId}, ID from tab_master`;
        await db.executeQuery(q_tab, supportKey);

        for (let i = 0; i < applicants.length; i++) {
            const applicant = applicants[i];
            const applicantNo = i + 1;
            let applicantPersonalData = { ...getCommonApplicantInfo(), ...getAllApplicantsInfo(applicant, i + 1), APPLICANT_ID: proposalId };
            let applicantPhotoData = { FIRST_NAME: applicant.FIRST_NAME, MIDDLE_NAME: applicant.MIDDLE_NAME, LAST_NAME: applicant.LAST_NAME, APPLICANT_ID: proposalId, APPLICANT_NO: applicantNo };

            let applicantQuery = `insert into applicants_personal_details set ? `;
            let applicantPhotosQuery = `insert into applicant_photos set ? `;
            let applicantDocumentsQuery = `insert into applicant_documents (DOCUMENT_NAME,APPLICANT_ID,APPLICANT_NO) select DOCUMENT_NAME, ${proposalId}, ${applicantNo}  from document_master ORDER BY SEQ_NO`;

            await db.executeQueryData(applicantQuery, applicantPersonalData, supportKey);
            await db.executeQueryData(applicantPhotosQuery, applicantPhotoData, supportKey);
            await db.executeQuery(applicantDocumentsQuery, supportKey);
        }

        await db.commitConnection(connection);
        res.send({
            "code": 200,
            "message": "Basic details saved successfully",
            "APPLICANT_ID": proposalId
        });

    } catch (error) {
        console.log("error", error);
        if (connection) {
            await db.rollbackConnection(connection);
        }
        res.status(400).send({
            "code": 400,
            "message": "Failed to save basic details"
        });
    }
}


exports.update1 = async (req, res) => {
    const supportKey = req.headers['supportkey'];
    let connection;
    let ROLE_ID = req.body.ROLE_ID;
    let data = ``;
    const applicants = req.body.applicants;

    if (ROLE_ID == 1) {
        data = reqData(req);
        data.APPLICANTS_DATA = JSON.stringify(applicants);
        if (data.TRACK_ID == 2) data.MODIFIED_DATE = new Date();
    } else if (ROLE_ID == 2) {
        data = checkerAccess(req);
        data.MODIFIED_DATE = new Date();
    } else if (ROLE_ID == 3) {
        data = cpcAccess(req);
        data.MODIFIED_DATE = new Date();
    } else {
        data = reqData(req);
    }

    let setData = '';
    let recData = [];
    Object.keys(data).forEach(key => {
        setData += `${key} = ? ,`;
        recData.push(data[key]);
    });
    setData = setData.slice(0, -1);

    const q = `update basic_details set ${setData} where ID = ?`;
    recData.push(req.body.ID);

    try {
        connection = await db.openConnection();
        await db.executeQueryData(q, recData, supportKey);

        if (ROLE_ID == 1) {
            for (let i = 0; i < applicants.length; i++) {
                const applicant = applicants[i];
                const applicantNo = i + 1;
                const existingApplicant = await db.executeQuery(`select * from applicants_personal_details where APPLICANT_ID = ${req.body.ID} AND APPLICANT_NO = ${applicantNo}`);

                if (existingApplicant.length > 0) {
                    // Update existing applicant
                    let applicantPersonalData = { ...getAllApplicantsInfo(applicant, i + 1) };
                    let updateQuery = `update applicants_personal_details set ? where ID = ?`;
                    await db.executeQueryData(updateQuery, [applicantPersonalData, existingApplicant[0].ID], supportKey);
                } else {
                    // Insert new applicant
                    let applicantPersonalData = { ...getCommonApplicantInfo(), ...getAllApplicantsInfo(applicant, i + 1), APPLICANT_ID: req.body.ID };
                    let applicantPhotoData = { FIRST_NAME: applicant.FIRST_NAME, MIDDLE_NAME: applicant.MIDDLE_NAME, LAST_NAME: applicant.LAST_NAME, APPLICANT_ID: req.body.ID, APPLICANT_NO: applicantNo };

                    let applicantQuery = `insert into applicants_personal_details set ? `;
                    let applicantPhotosQuery = `insert into applicant_photos set ? `;
                    let applicantDocumentsQuery = `insert into applicant_documents (DOCUMENT_NAME,APPLICANT_ID,APPLICANT_NO) select DOCUMENT_NAME, ${req.body.ID}, ${applicantNo}  from document_master ORDER BY SEQ_NO`;

                    await db.executeQueryData(applicantQuery, applicantPersonalData, supportKey);
                    await db.executeQueryData(applicantPhotosQuery, applicantPhotoData, supportKey);
                    await db.executeQuery(applicantDocumentsQuery, supportKey);
                }
            }
        }

        await db.commitConnection(connection);
        res.send({
            "code": 200,
            "message": "Basic details updated successfully"
        });

    } catch (error) {
        console.log(error);
        if (connection) {
            await db.rollbackConnection(connection);
        }
        res.status(400).send({
            "code": 400,
            "message": "Failed to update personal information."
        });
    }
}

exports.update = async (req, res) => {
    const supportKey = req.headers['supportkey'];
    const data = reqData(req);
    let setData = '';
    let recData = [];

    Object.keys(data).forEach(key => {
        setData += `${key} = ?,`;
        recData.push(data[key]);
    });

    setData = setData.slice(0, -1);

    const q = `update basic_details set ${setData} where ID = ?`;
    recData.push(req.body.ID);

    try {
        await db.executeQueryData(q, recData, supportKey);
        res.send({
            "code": 200,
            "message": "Basic details updated successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            "code": 400,
            "message": "Failed to update basic form details"
        });
    }
};

function convertDate(date = null) {
    if (date)
        return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    else
        return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

exports.getAll = async (req, res) => {
    const { user_details, filter: userFilter, pageIndex = '', pageSize = '', sortKey = 'MODIFIED_DATE', sortValue = 'DESC' } = req.body;
    const supportKey = req.header ? req.header['supportkey'] : '';

    const userFilterStr = `
        ${userFilter.BRANCH_ID ? ` AND CREATED_BRANCH_ID = ${userFilter.BRANCH_ID}` : ''}
        ${userFilter.TRACK_ID ? ` AND TRACK_ID = ${userFilter.TRACK_ID}` : ''}
        ${userFilter.IS_AADHAAR_DBT === 'Y' ? ` AND IS_AADHAAR_DBT` : ''}
        ${userFilter.IS_AADHAAR_DBT === 'N' ? ` AND NOT IS_AADHAAR_DBT OR ISNULL(IS_AADHAAR_DBT)` : ''}
        ${userFilter.START_DATE ? ` AND CAST(APPLICATION_DATE AS DATE) >= CAST('${convertDate(userFilter.START_DATE)}' AS DATE)` : ''}
        ${userFilter.END_DATE ? ` AND CAST(APPLICATION_DATE AS DATE) <= CAST('${convertDate(userFilter.END_DATE)}' AS DATE)` : ''}
    `;

    let filter = '';
    const branchFilter = ` AND CREATED_BRANCH_ID = ${user_details.BRANCH_ID}`;
    const chakerFilter = ` AND MAKER_USER_ID = ${user_details.USER_ID} ${branchFilter}`;
    const makerFilter = ` AND CHACKER_USER_ID = ${user_details.USER_ID} ${branchFilter}`;
    const verifierFilter = ` ${userFilterStr} AND (VERIFIER_USER_ID = ${user_details.USER_ID}  OR (ISNULL(VERIFIER_USER_ID) AND TRACK_ID = 3))`;

    if (user_details.ROLE_ID == 1) filter = chakerFilter;
    else if (user_details.ROLE_ID == 2) filter = makerFilter;
    else if (user_details.ROLE_ID == 3) filter = verifierFilter;

    let criteria = `${filter} order by ${sortKey} ${sortValue}`;
    if (pageIndex && pageSize) {
        const start = (pageIndex - 1) * pageSize;
        criteria += ` LIMIT ${start},${pageSize}`;
    }

    const countCriteria = filter;

    try {
        const [resultCount, results] = await Promise.all([
            db.executeQuery(`select count(*) as cnt from basic_details where 1 ${countCriteria}`, supportKey),
            db.executeQuery(`select * from basic_details where 1 ${criteria}`, supportKey)
        ]);

        res.send({
            "code": 200,
            "message": "ok",
            "count": resultCount[0] ? resultCount[0].cnt : 0,
            "data": results
        });
    } catch (error) {
        console.log("error", error);
        res.status(400).send({
            "code": 400,
            "message": "Failed to get drafts"
        });
    }
};
