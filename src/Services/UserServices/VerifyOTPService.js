const OTPModel = require("../../Models/OTPModel");
const UserModel = require("../../Models/UserModel");
const { EncodeToken } = require("../../Utility/TokenUtility");

const VerifyOTPService  = async(req) =>{
    try {
        const email= req.params.email;
        const otp= req.params.otp;
        
        const total = await OTPModel.find({email: email, otp: otp}).count();

        if(total > 0) {

            const user = await UserModel.findOne({ email });
            
            // User Token Create
            const token=EncodeToken(email, user.role, user._id.toString() );
            
            // OTP Code Update To 0
            await OTPModel.updateOne({email:email, otp: otp}, {$set: {status: 1 }});
            return {status:"success", message:"Your OTP Verify Successfully", token: token }

        }else{
            return {status:"fail", message:"Invalid OTP"}
        }

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

};

module.exports = VerifyOTPService