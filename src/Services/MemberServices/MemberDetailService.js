const mongoose = require("mongoose");
const MembersModel = require("../../Models/MembersModel");
const ObjectID= mongoose.Types.ObjectId;


const MemberDetailService = async(req) =>{

    try {
        
     
        const id = new ObjectID(req.params.id);
        
        const data = await MembersModel.aggregate([
        
                {$match: {userID: id }},
                {$lookup: {from: "packages", localField: "packageID", foreignField: "_id", as: "package"} },
                {$unwind: "$package" },
                {$lookup: {from: "services", localField: "services._id", foreignField: "_id", as: "services" } },
                {$unwind: "$services"},
                {$lookup: {from: "users", localField: "userID", foreignField: "_id", as: "profile" } },
                {$unwind: "$profile"},
                {
                    $group: {
                        _id: "$_id",
                        userID: { $first: "$userID" },
                        imgUrl: { $first: "$profile.imgUrl" },
                        name: { $first: "$profile.name" },
                        memberID: { $first: "$memberID" },
                        fatherName: { $first: "$profile.fatherName" },
                        address: { $first: "$profile.address" },
                        phone: { $first: "$profile.phone" },
                        packageID: { $first: "$packageID" },
                        status: { $first: "$status" },
                        expireDate: { $first: "$expireDate" },
                        createdAt: { $first: "$createdAt" },
                        updatedAt: { $first: "$updatedAt" },
                        package: { $first: "$package" },
                        services: { $push: "$services" }, // Merge services into an array
                        
                    }
                },
                {$project: {
                    "package._id": 0,
                    "package.createdAt": 0,
                    "package.updatedAt": 0,
                    // "services": 0,
                    "updatedAt": 0,
                    "services.createdAt": 0,
                    "services.updatedAt": 0,
                    
                }},

        ])

        
        return {status:"success", data: data};

    } catch (error) {

        return {status:"fail", data:error.toString()}

    }

}



module.exports= MemberDetailService;