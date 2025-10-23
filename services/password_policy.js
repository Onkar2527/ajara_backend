const db = require('../utilities/dbModule')


let reqBody = (req) => {
    let data = {
        FR_SMALL_LETTERS: req.body.FR_SMALL_LETTERS,
        FR_CAPITAL_LETTERS: req.body.FR_CAPITAL_LETTERS,
        FR_NUMBERS: req.body.FR_NUMBERS,
        FR_SYMBOLS: req.body.FR_SYMBOLS,
        PASSWORD_LENGTH: req.body.PASSWORD_LENGTH,
        FR_PASSWORD_RESET: req.body.FR_PASSWORD_RESET,
        UPDATE_DATE: req.body.UPDATE_DATE,
    }

    return data;
}

exports.get = async (req, res) => {
    try {
        let query = 'select * from password_policy';

        let result = await db.executeQuery(query, "");
        if (result.length > 0) {
            res.send({
                "code": 200,
                "data": result[0]
            })
        }
        else {
            res.send({
                "code": 404,
                "message": "not found"
            })
        }

    }
    catch (error) {
        console.log(error)
        res.send({
            "code": 200,
            "error": error
        })
    }
}

exports.save = async (req, res) => {
    try {

        let updateData = reqBody(req);

        const current_dt = new Date().toISOString().slice(0, 19).replace('T', ' ');

        updateData.UPDATE_DATE = current_dt;

        let query = 'update password_policy set ?';

        await db.executeQueryData(query, updateData, "");

        res.send({
            "code": 200,
            "message": "Updated"
        })

    }
    
    catch (error) {
        console.log(error)
        res.send({
            "code": 200,
            "error": error
        })
    }
}
