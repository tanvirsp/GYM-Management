const mongoose = require("mongoose");
const MembersModel = require("../../Models/MembersModel");
const UserModel = require("../../Models/UserModel");
const ObjectID= mongoose.Types.ObjectId;



exports.UpdateService = async(req, dataModel) =>{

    try {
        
        const reqBody = req.body
        const id = new ObjectID(req.params.id);
        const data = await dataModel.updateOne({_id: id}, reqBody )
        await UserModel.updateOne({_id: id}, reqBody )
        
        return {status:"success", data: data};

    } catch (error) {

        return {status:"fail", data:error.toString()}

    }

}
