const DueModel = require("../../Models/DueModel");
const PaymentModel = require("../../Models/PaymentModel");
const mongoose = require("mongoose");
const UserModel = require("../../Models/UserModel");
const MembersModel = require("../../Models/MembersModel");



const CreateMemberService = async(req) =>{
    const session = await mongoose.startSession();

   

    try {

        // Begin Transaction
        session.startTransaction();
        
        const {memberID, name, imgUrl,  fatherName, address, phone, email, password, 
            packageID, expireDate, services,  amountPay, due} = req.body;



        //Adding new User
        const userData = {name, fatherName, address, phone, imgUrl, email, password, role:"member", memberID }
        const userInfo = await UserModel.create([userData], {session});
        
  
        
        //Adding new Member
        const memberData = {userID: userInfo[0]._id, memberID, packageID, expireDate, services};
        const result = await MembersModel.create([memberData], {session});

        
            
        const paymentData = {amount: amountPay, note: "New Memeber Entry", userID: userInfo[0]._id};


        // //Adding Payment to Payment DB
        const paymentResult = await PaymentModel.create([paymentData], {session})
        if(due > 0){
            const dueData = {userID: userInfo[0]._id, amount: due, note: "Member Due Payment" }
             //Adding Due Payment to Due DB
            await DueModel.create(dueData)
        }
       

        // Transaction Success
        await session.commitTransaction();
        session.endSession();


        
        
        return {status:"success", data: userInfo,   };

    } catch (error) {

        return {status:"fail", data:error.toString()}

    }

}



module.exports= CreateMemberService;