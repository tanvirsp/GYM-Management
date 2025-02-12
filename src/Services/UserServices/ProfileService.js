const { model } = require("mongoose");
const UserModel = require("../../Models/UserModel");

const ProfileService = async(req) =>{
    try {
        const email = req.headers.email;
        const data = await UserModel.find({email: email}, {password: 0, updatedAt: 0, otp: 0}  )      ;

        return {status:"success", data: data}

    } catch (error) {
        return {status:"fail", data:error.toString()}
    }
}


module.exports = ProfileService;