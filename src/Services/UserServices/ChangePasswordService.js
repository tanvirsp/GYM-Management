const bcrypt = require("bcrypt");
const UserModel = require("../../Models/UserModel");

const ChangePasswordService = async(req) =>{
    try {
    
        const {oldPassword, newPassword} = req.body;
        const email =  req.headers.email

 
       // Check if user exists
       const user = await UserModel.findOne({ email });
       if(!user){
           return {status:"fail", message: "User not found, please Signup"}
       };
       
        //check if Old password is correct
        const oldPasswordIsCorrect = await bcrypt.compare(oldPassword, user.password);
        

        if(!oldPasswordIsCorrect){
            return {status:"fail", message: "Old password is not matching"}
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedNewassword = await bcrypt.hash(newPassword, salt);

        await UserModel.updateOne({email: email}, {$set: {password: hashedNewassword}});
        return {status:"success", message: "Your password have been changed"}


    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
};

module.exports= ChangePasswordService;