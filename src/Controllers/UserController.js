const UserModel = require("../Models/UserModel");
const ChangePasswordService = require("../Services/UserServices/ChangePasswordService");
const ProfileService = require("../Services/UserServices/ProfileService");
const ProfileUpdateService = require("../Services/UserServices/ProfileUpdateService");
const ResetPasswordService = require("../Services/UserServices/ResetPasswordService");
const SendOtpService = require("../Services/UserServices/SendOtpService");
const UserCreateService = require("../Services/UserServices/UserCreateService");
const UserListService = require("../Services/UserServices/UserListService");
const UserLoginService = require("../Services/UserServices/UserLoginService");
const VerifyOTPService = require("../Services/UserServices/VerifyOTPService");



exports.CreateUser = async(req, res) =>{
    const result = await UserCreateService(req, UserModel)
    return res.status(200).json(result)

}


exports.LoginUser = async(req, res) =>{
    const result = await UserLoginService(req, UserModel)
    if(result['status']==="success"){
        
        // Cookies Option
        const cookieOption={expires:new Date(Date.now()+24*60*60*1000), httpOnly:false}
        // Set Cookies With Response
        res.cookie('token', result['token'], cookieOption);
        
        return res.status(200).json(result)

    }else {
        
        return res.status(200).json(result)
    }

};



exports.LogoutUser = async(req, res) =>{

    const cookieOption={expires:new Date(Date.now()-24*60*60*1000), httpOnly:false}

    // Set Cookies With Response
    res.cookie('token',"", cookieOption)
    return res.status(200).json({status:"success"})

}



exports.SendOtp = async(req, res) =>{
    const result = await SendOtpService(req)
    return res.status(200).json(result)
}



exports.VerifyOTP = async(req, res) =>{
    const result = await VerifyOTPService(req);
    if(result['status']==="success"){
        // Cookies Option
        const cookieOption={expires:new Date(Date.now()+24*60*60*1000), httpOnly:false}
        // Set Cookies With Response
        res.cookie('token', result['token'], cookieOption)
        return res.status(200).json(result)

    }else {
        return res.status(200).json(result)
    }   
    
}



exports.ResetPassword = async(req, res) =>{
    const result = await ResetPasswordService(req)
    return res.status(200).json(result)
}


exports.ChangePassword = async(req, res) =>{
    const result = await ChangePasswordService(req)
    return res.status(200).json(result)
}




exports.Profile = async(req, res) =>{
    const result = await ProfileService(req)
    return res.status(200).json(result)
}

exports.ProfileUpdate = async(req, res) =>{
    const result = await ProfileUpdateService(req)
    return res.status(200).json(result)
}


exports.UserList = async(req, res) =>{
    const result = await UserListService(req)
    return res.status(200).json(result)
}



