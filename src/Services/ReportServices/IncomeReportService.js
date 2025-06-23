const PaymentModel = require("../../Models/PaymentModel");

const IncomeReportService = async(req) =>{
    try {

        const FormDate=  req.body['fromDate']
        const ToDate =  req.body['toDate']


        const data = await  PaymentModel.aggregate([
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
                        { $project: {"_id": 0, "userID": 0, "updatedAt": 0} }
                    ],
                  
                }
            }
           


        ])

         return {status:"success", data: data};



    } catch (error) {
        return {status:"fail", data:error.toString()}
    }

}



module.exports = IncomeReportService