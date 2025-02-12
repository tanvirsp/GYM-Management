const OTPModel = require("../../Models/OTPModel");
const UserModel = require("../../Models/UserModel");
const EmailSend = require("../../Utility/EmailUtility");

const SendOtpService = async(req, ) =>{
    try {
        const email= req.params.email;
        const user = await UserModel.findOne({ email });
        if(!user){
            return {status:"fail", message: "User not found, please Signup"}
        };


        let OTPcode;
        const NotUseOTP = await OTPModel.findOne({email: email, status: 0 });
        if(NotUseOTP){
            OTPcode = NotUseOTP.otp
        } else {
            //sendign verify code to email
            OTPcode = Math.floor(100000+Math.random()*900000);
            //set OTP into user database
            await OTPModel.create({email: email, otp: OTPcode } );
        }


        const emailSubject='Email Verification'
        await EmailSend(email, OTPcode, emailSubject );

        
        return {status:"success", message:"6 Digit OTP has been send check mail"}  

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}

module.exports = SendOtpService