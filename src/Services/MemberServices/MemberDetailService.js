const mongoose = require("mongoose");
const ObjectID= mongoose.Types.ObjectId;


const MemberDetailService = async(req, dataModel) =>{

    try {
        
     
        const id = new ObjectID(req.params.id);
        const data = await dataModel.aggregate([
            {
                $facet:{
                    memberDetails: [
                        { $match: {_id: id }},
                        {$lookup: {from: "packages", localField: "packageID", foreignField: "_id", as: "package"} },
                        { $unwind: "$package" },
                        {$lookup: {from: "services", localField: "services.serviceID", foreignField: "_id", as: "serviceDetails" } },
                        {$project: {services: 0, "serviceDetails.createdAt": 0, "serviceDetails.updatedAt": 0 , updatedAt: 0,  "package.createdAt": 0, "package.updatedAt": 0,}},
                    ],
                    
                }
            }
            
            

        ])

        
        return {status:"success", data: data};

    } catch (error) {

        return {status:"fail", data:error.toString()}

    }

}



module.exports= MemberDetailService;