const db = require('../utilities/dbModule');



function reqData(req)
{
    data = {
            APPLICANT_ID : req.body.APPLICANT_ID,
            IS_MINOR:req.body.IS_MINOR,
            DOB:req.body.DOB,
            NOMINEE_NAME:req.body.NOMINEE_NAME,
            RELATION :req.body.RELATION,
            NOMINEE_ADDRESS :req.body.NOMINEE_ADDRESS,
            APONITED_NAME:req.body.APONITED_NAME,
            APONITED_ADDRESS:req.body.APONITED_ADDRESS
        
    }

    return data;
}

exports.get = (req, res) =>{
    let supportKey = req.headers['supportkey'];
    const q = `select * from nominee_details where APPLICANT_ID = ${req.body.APPLICANT_ID}`
    db.executeQuery(q, supportKey, (error, results)=>{
        if(error)
        {
            res.send({
                "code": 400,
                "message": "Failed to get Nominee Details "
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
    const q = `insert into nominee_details set ?`

    db.executeQueryData(q, data, supportKey, (error)=>{

        if(error)
        {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed to save Nominee Details information"
            })
        }
        else
        {
            res.send({
                "code": 200,
                "message": "Nominee Details information saved successfully"
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


    const q = `update nominee_details set ${setData2} where ID = ${req.body.ID}`
    db.executeQueryData(q , recData , supportKey , (error)=>{
        if(error)
        {
            console.log(error);
            res.send({
                "code": 400,
                "message": "Failed to update nominee_details."
            })

        }
        else
        {
            res.send({
                "code": 200,
                "message": "nominee_details information updated successfully"
            })

        }

    })


}