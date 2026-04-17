const db = require('../utilities/dbModule');

exports.getAllReports = async (req, res) => {
    try {
        const supportKey = req.headers['supportkey'];

        const q = `
            SELECT 
                ID,
                REPORT_NAME,
                REPORT_KEY
            FROM report_master
            WHERE IS_ACTIVE = 1
            ORDER BY ORDER_NO
        `;

        const result = await db.executeQueryData(q, [], supportKey);

        res.send({
            code: 200,
            message: 'Report list fetched successfully',
            data: result
        });

    } catch (error) {
        console.log('getAllReports error:', error);
        res.send({
            code: 400,
            message: 'Failed to fetch report list'
        });
    }
};


exports.getStageWiseReport = async (req, res) => {
    try {
        const supportKey = req.headers['supportkey'];

        const q = `
      SELECT 
          bm.BRANCH_NAME AS BRANCH_NAME,
          bd.ACCOUNT_NUMBER,
          bd.PRIMARY_APPLICANT_FIRST_NAME,
          bd.PRIMARY_APPLICANT_MIDDLE_NAME,
          bd.PRIMARY_APPLICANT_LAST_NAME,
          bd.ACCOUNT_TYPE,
          tm.NAME AS STAGE_NAME,
          bd.FILLED_DATE_TIME
      FROM basic_details bd
      LEFT JOIN branch_master bm 
          ON bm.ID = bd.CREATED_BRANCH_ID
      LEFT JOIN track_master tm 
          ON tm.ID = bd.TRACK_ID
      ORDER BY bd.FILLED_DATE_TIME DESC
    `;

        const result = await db.executeQueryData(q, [], supportKey);

        res.send({
            code: 200,
            data: result
        });

    } catch (err) {
        res.send({ code: 400 });
    }
};

// const db = require('../utilities/dbModule');

exports.getAadhaarPanReport = async (req, res) => {
    try {
        const supportKey = req.headers['supportkey'];

        const q = `
      SELECT 
          bd.CREATED_BRANCH_ID,
          bm.BRANCH_NAME AS BRANCH_NAME,
          bd.ACCOUNT_NUMBER,
          bd.PRIMARY_APPLICANT_FIRST_NAME,
          bd.PRIMARY_APPLICANT_MIDDLE_NAME,
          bd.PRIMARY_APPLICANT_LAST_NAME,
          bd.AADHAAR_NUMBER,
          av.IS_VERIFIED AS AADHAAR_IS_VERIFIED,
          bd.PAN_NUMBER,
          pv.IS_VERIFIED AS PAN_IS_VERIFIED
      FROM basic_details bd
      LEFT JOIN branch_master bm
          ON bm.ID = bd.CREATED_BRANCH_ID
      LEFT JOIN aadhaar_verified_list av
          ON av.AADHAAR_NUMBER = bd.AADHAAR_NUMBER
      LEFT JOIN pan_verified_list pv
          ON pv.PAN_NUMBER = bd.PAN_NUMBER
      ORDER BY bd.ACCOUNT_NUMBER
    `;

        const result = await db.executeQueryAsyncAwait(q, [], supportKey);

        res.send({
            code: 200,
            message: 'Aadhaar PAN report fetched successfully',
            data: result
        });

    } catch (error) {
        console.log('getAadhaarPanReport error:', error);

        res.send({
            code: 400,
            message: 'Failed to fetch Aadhaar PAN report'
        });
    }
};

// exports.getBranchWiseReport = async(req, res) => {
//     try {

//         const query = `
//         SELECT 
//             DATE(bd.FILLED_DATE_TIME) AS FILLED_DATE,
//             bm.BRANCH_NAME,

//             SUM(CASE WHEN bd.TRACK_ID = 1 THEN 1 ELSE 0 END) AS BA_COUNT,
//             SUM(CASE WHEN bd.TRACK_ID = 2 THEN 1 ELSE 0 END) AS BM_COUNT,
//             SUM(CASE WHEN bd.TRACK_ID = 3 THEN 1 ELSE 0 END) AS CPC_COUNT,
//             SUM(CASE WHEN bd.TRACK_ID = 4 THEN 1 ELSE 0 END) AS ACCOUNT_CREATED_COUNT,
//             COUNT(*) AS TOTAL_PROPOSALS

//         FROM basic_details bd
//         INNER JOIN branch_master bm
//             ON bm.ID = bd.CREATED_BRANCH_ID

//         GROUP BY 
//             DATE(bd.FILLED_DATE_TIME),
//             bm.BRANCH_NAME

//         UNION ALL

//         SELECT 
//             NULL AS FILLED_DATE,
//             'ALL BRANCH TOTAL' AS BRANCH_NAME,

//             SUM(CASE WHEN bd.TRACK_ID = 1 THEN 1 ELSE 0 END) AS BA_COUNT,
//             SUM(CASE WHEN bd.TRACK_ID = 2 THEN 1 ELSE 0 END) AS BM_COUNT,
//             SUM(CASE WHEN bd.TRACK_ID = 3 THEN 1 ELSE 0 END) AS CPC_COUNT,
//             SUM(CASE WHEN bd.TRACK_ID = 4 THEN 1 ELSE 0 END) AS ACCOUNT_CREATED_COUNT,
//             COUNT(*) AS TOTAL_PROPOSALS

//         FROM basic_details bd
//     `;

//         const result = await mm.executeQuery(query);

//         res.status(200).json({
//             success: true,
//             data: result
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: "Error fetching report",
//             error: error.message
//         });
//     }
// };


// const db = require('../utilities/dbModule');

exports.getBranchWiseReport = async (req, res) => {
    try {
        const supportKey = req.headers['supportkey'];

        const q = `
      SELECT 
            DATE(bd.FILLED_DATE_TIME) AS FILLED_DATE,
            bm.BRANCH_NAME,

            SUM(CASE WHEN bd.TRACK_ID = 1 THEN 1 ELSE 0 END) AS BA_COUNT,
            SUM(CASE WHEN bd.TRACK_ID = 2 THEN 1 ELSE 0 END) AS BM_COUNT,
            SUM(CASE WHEN bd.TRACK_ID = 3 THEN 1 ELSE 0 END) AS CPC_COUNT,
            SUM(CASE WHEN bd.TRACK_ID = 4 THEN 1 ELSE 0 END) AS ACCOUNT_CREATED_COUNT,
            COUNT(*) AS TOTAL_PROPOSALS

        FROM basic_details bd
        INNER JOIN branch_master bm
            ON bm.ID = bd.CREATED_BRANCH_ID

        GROUP BY 
            DATE(bd.FILLED_DATE_TIME),
            bm.BRANCH_NAME

        UNION ALL

        SELECT 
            NULL AS FILLED_DATE,
            'ALL BRANCH TOTAL' AS BRANCH_NAME,

            SUM(CASE WHEN bd.TRACK_ID = 1 THEN 1 ELSE 0 END) AS BA_COUNT,
            SUM(CASE WHEN bd.TRACK_ID = 2 THEN 1 ELSE 0 END) AS BM_COUNT,
            SUM(CASE WHEN bd.TRACK_ID = 3 THEN 1 ELSE 0 END) AS CPC_COUNT,
            SUM(CASE WHEN bd.TRACK_ID = 4 THEN 1 ELSE 0 END) AS ACCOUNT_CREATED_COUNT,
            COUNT(*) AS TOTAL_PROPOSALS

        FROM basic_details bd
    `;

        const result = await db.executeQueryAsyncAwait(q, [], supportKey);

        res.send({
            code: 200,
            message: 'Stage summary report fetched successfully',
            data: result
        });

    } catch (error) {
        console.log('getStageSummaryReport error:', error);

        res.send({
            code: 400,
            message: 'Failed to fetch stage summary report'
        });
    }
};


exports.getAadhaarPanVerificationReport = async (req, res) => {
    try {
        const supportKey = req.headers['supportkey'];

        const q = `
      SELECT 
          bd.CREATED_BRANCH_ID,
          bm.BRANCH_NAME AS BRANCH_NAME,
          bd.ACCOUNT_NUMBER,
          bd.PRIMARY_APPLICANT_FIRST_NAME,
          bd.PRIMARY_APPLICANT_MIDDLE_NAME,
          bd.PRIMARY_APPLICANT_LAST_NAME,
          bd.AADHAAR_NUMBER,
          av.IS_VERIFIED AS AADHAAR_IS_VERIFIED,
          bd.PAN_NUMBER,
          pv.IS_VERIFIED AS PAN_IS_VERIFIED
      FROM basic_details bd
      LEFT JOIN branch_master bm
          ON bm.ID = bd.CREATED_BRANCH_ID
      LEFT JOIN aadhaar_verified_list av
          ON av.AADHAAR_NUMBER = bd.AADHAAR_NUMBER
      LEFT JOIN pan_verified_list pv
          ON pv.PAN_NUMBER = bd.PAN_NUMBER
      ORDER BY bd.ACCOUNT_NUMBER
    `;

        const result = await db.executeQueryAsyncAwait(q, [], supportKey);

        res.send({
            code: 200,
            message: 'Aadhaar PAN verification report fetched successfully',
            data: result
        });

    } catch (error) {
        console.log('getAadhaarPanVerificationReport error:', error);

        res.send({
            code: 400,
            message: 'Failed to fetch Aadhaar PAN verification report'
        });
    }
};