const db = require('../utilities/dbModule');


function reqData(req) {
    let data = {
        
        APPLICANT_ID : req.body.APPLICANT_ID,
        APPLICANT_NO : req.body.APPLICANT_NO,
        INCOME : req.body.INCOME

    }

    return data;
}


exports.get = (req, res) => {
    const data = reqData(req);
    const q = `select * from financial_information where APPLICANT_ID = ${req.body.APPLICANT_ID} ` + (req.body.APPLICANT_NO ? 'AND APPLICANT_NO = '+ req.body.APPLICANT_NO : '');
    const supportKey = req.headers['supportkey'];
    db.executeQuery(q, supportKey ,(error, results)=>{
        if(error)
        {
            console.log("error", error);
            res.send({
                "code": 400,
                "message": "Failed to get financial information"
            })
        }
        else{
            res.send({
                "code": 200,
                "message": "ok",
                "data": results

            })
        }
    
    } )

}


exports.create = (req, res) =>{

    let data = reqData(req)

    const q = `insert into financial_information set ?`
    const supportKey = req.headers['supportkey']
    db.executeQueryData(q , data, supportKey , (error)=>{
        if(error)
        {
            console.log("error", error);
            res.send({
                "code": 400,
                "message" : "Failed to save financial information"
            })
        }
        else{
            res.send({
                "code": 200,
                "message": "Financial information saved successful"
            })
        }
    })
}


exports.update = (req, res) =>{

    const supportKey = req.headers['supportkey'] ;   


    const data = reqData(req);
    let setData = '';
    let recData = [];

    Object.keys(data).forEach(key => {
        setData += `${key} = ? ,`;
        recData.push(data[key]);
    });

    setData2 = setData.slice(0,-1);


    const q = `update financial_information set ${setData2} where ID = ${req.body.ID}`
    db.executeQueryData(q , recData , supportKey , (error)=>{
        if(error)
        {
            console.log(error);
            res.send({
                "code": 400,
                "message": "Failed to update financial information."
            })

        }
        else
        {
            res.send({
                "code": 200,
                "message": "Financial information updated successfully"
            })

        }

    })

}