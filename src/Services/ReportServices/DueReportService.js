const DueModel = require("../../Models/DueModel");


const DueReportService = async(req) =>{
    try {

        const FormDate=  req.body['fromDate']
        const ToDate =  req.body['toDate']
        
        

        const data = await  DueModel.aggregate([
            {$match: {status: "due",createdAt:{$gte:new Date(FormDate),$lte:new Date(ToDate)}}},
            {
                $facet:{
                    Total:[{
                        $group:{
                            _id:0,
                            TotalAmount:{$sum:"$amount"}
                        }
                    }],
                    Rows:[
                        {$lookup: {from: "users", localField: "userID", foreignField: "_id", as: "userDetails"}},
                        {$unwind:"$userDetails"},
                        { $project: {"_id": 0, "typeID": 0, "updatedAt": 0, "userID": 0, "userDetails.password": 0,  "userDetails.updatedAt": 0 } }
                    ],
                  
                }
            }
           


        ])

         return {status:"success", data: data};



    } catch (error) {
        return {status:"fail", data:error.toString()}
    }

}



module.exports = DueReportService