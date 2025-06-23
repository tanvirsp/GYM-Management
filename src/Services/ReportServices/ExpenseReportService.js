const ExpensesModel = require("../../Models/ExpensesModel");


const ExpenseReportService = async(req) =>{
    try {

        const FormDate=  req.body['fromDate']
        const ToDate =  req.body['toDate']
        

        const data = await  ExpensesModel.aggregate([
            {$match: {createdAt:{$gte:new Date(FormDate),$lte:new Date(ToDate)}}},
            {
                $facet:{
                    Total:[{
                        $group:{
                            _id:0,
                            TotalAmount:{$sum:"$amount"}
                        }
                    }],
                    Rows:[
                        {$lookup: {from: "expense-types", localField: "typeID", foreignField: "_id", as: "type"}},
                        {$unwind:"$type"},
                        { $project: {"_id": 0, "typeID": 0, "updatedAt": 0, "type._id": 0, "type.slug": 0, "type.createdAt": 0, "type.updatedAt": 0} }
                    ],
                  
                }
            }
           


        ])

         return {status:"success", data: data};



    } catch (error) {
        return {status:"fail", data:error.toString()}
    }

}



module.exports = ExpenseReportService