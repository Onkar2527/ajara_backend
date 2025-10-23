const db = require('../utilities/dbModule');

const branch_master = 'branch_master';


exports.get = async (req, res) => {
    try {
        let supportKey = req.headers['supportkey'];

        let query = `select * from ${branch_master}`

        let result = await db.executeQuery(query, supportKey);

        res.send({
            "message": "success",
            "code": 200,
            "data": result
        })
    }
    catch (error) {
        console.log(error)
        res.send({
            "message": "Failed to get branch",
            "code": 400
        })
    }
}