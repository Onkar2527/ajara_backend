const db = require('../utilities/dbModule');


exports.get = (req, res) =>{

    var pageIndex = req.body.pageIndex ? req.body.pageIndex : '';

    var pageSize = req.body.pageSize ? req.body.pageSize : '';
    var start = 0;
    var end = 0;

    console.log(pageIndex + " " + pageSize)
    if (pageIndex != '' && pageSize != '') {
        start = (pageIndex - 1) * pageSize;
        end = pageSize;
        console.log(start + " " + end);
    }

    let sortKey = req.body.sortKey ? req.body.sortKey : 'ID';
    let sortValue = req.body.sortValue ? req.body.sortValue : 'DESC';
    let filter = req.body.filter ? req.body.filter : ` STATUS = 'D'`;

    let criteria = '';

    if (pageIndex === '' && pageSize === '')
        criteria = filter + " order by " + sortKey + " " + sortValue;
    else
        criteria = filter + " order by " + sortKey + " " + sortValue + " LIMIT " + start + "," + end;

    let countCriteria = filter;
  


    const supportKey = req.header['supportkey'];
    


    db.executeQuery(`select count(*) as cnt from basic_details where 1 AND STATUS='D'`,supportKey,(error,resultCount)=>{
        if(error)
        {

        }
        else
        {
            db.executeQuery( `select * from basic_details where 1 AND `+ criteria , supportKey, (error, results)=>{
                if(error)
                {
                    console.log("error", error);
                    res.send({
                        "code": 400,
                        "message": "Failed to get drafts"
                    })
                }
                else{
                    console.log("count,data");
                    res.send({
                        "code": 200,
                        "message": "ok",
                        "count": resultCount[0].cnt,
                        "data": results
                    })
                }
            })
        }
    })

    
}