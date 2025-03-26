const mongoose = require("mongoose");

const MembersModel = require("../../Models/MembersModel");
const UserModel = require("../../Models/UserModel");
const ObjectID= mongoose.Types.ObjectId;



const MemberUpdateService = async(req) =>{
    

    try {
        
        
        const reqBody = req.body
        const userID = new ObjectID(req.params.id);


        const memberUpdateData = {
            memberID: reqBody.memberID,
            packageID: reqBody.packageID,  
            services: reqBody.services,  
        };

        const userUpdateData = {
            name: reqBody.name,
            address: reqBody.address,
            imgUrl: reqBody.imgUrl,
            phone: reqBody.phone,
            memberID: reqBody.memberID,

          };
        
        const data1 = await MembersModel.updateOne({userID: userID}, memberUpdateData );
        const data2 = await UserModel.updateOne({_id: userID}, userUpdateData );

        
        
        return {status:"success",   data:{ data1, data2 } };

    } catch (error) {

        return {status:"fail", data:error.toString()}

    }

};


module.exports=MemberUpdateService;