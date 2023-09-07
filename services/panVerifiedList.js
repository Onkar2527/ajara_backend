const db = require('../utilities/dbModule');



function reqData(req)
{
    data = {
            APPLICANT_FULL_NAME : req.body.APPLICANT_FULL_NAME,
            APPLICANT_NO : req.body.APPLICANT_NO,
            APPLICANT_ID : req.body.APPLICANT_ID,
            PAN_NUMBER : req.body.PAN_NUMBER,
            IS_VERIFIED : req.body.IS_VERIFIED
            
    }

    return data;
}

exports.get = (req, res) =>{
    let supportKey = req.headers['supportkey'];
    const q = `select * from pan_verified_list where PAN_NUMBER = '${req.body.PAN_NUMBER}'`
    db.executeQuery(q, supportKey, (error, results)=>{
        if(error)
        {
            console.log(error);
            res.send({
                "code": 400,
                "message": "Failed to get pan verification info "
            })
        }
        else
        {
            res.send({
                "code": 200,
                "message": "OK",
                "data" : results
            })

        }
    } )

}

exports.create = (req,res) =>{
    const supportKey = req.headers['supportkey'] ;   


    const data =  reqData(req);
    const q = `insert into pan_verified_list set ?`

    db.executeQueryData(q, data, supportKey, (error)=>{

        if(error)
        {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed to save pan info"
            })
        }
        else
        {
            res.send({
                "code": 200,
                "message": "pan information saved successfully"
            })

        }
    })

    

}

exports.update = (req, res) => {
    const supportKey = req.headers['supportkey'] ;   


    const data = reqData(req);
    let setData = '';
    let recData = [];

    Object.keys(data).forEach(key => {
        setData += `${key} = ? ,`;
        recData.push(data[key]);
    });

    setData2 = setData.slice(0,-1);


    const q = `update pan_verified_list set ${setData2} where ID = ${req.body.PAN_NUMBER}`
    db.executeQueryData(q , recData , supportKey , (error)=>{
        if(error)
        {
            console.log(error);
            res.send({
                "code": 400,
                "message": "Failed to update pan info"
            })

        }
        else
        {
            res.send({
                "code": 200,
                "message": "pan information updated successfully"
            })

        }

    })


}