const UserModel = require("../../Models/UserModel");

const ProfileUpdateService =  async(req) =>{
    

    try {
        const reqBody = req.body; 
        const email = req.headers.email;
        await UserModel.updateOne({email: email}, {$set: reqBody}, {upsert: true});
        return {status:"success", message:"Profile Save Successfully"}

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}


module.exports=ProfileUpdateService;