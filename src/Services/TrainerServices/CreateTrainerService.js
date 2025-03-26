const SalaryModel = require("../../Models/SalaryModel");
const TrainerModel = require("../../Models/TrainerModel");
const mongoose = require("mongoose");
const UserModel = require("../../Models/UserModel");


const CreateTrainerService = async(req) =>{
    const session = await mongoose.startSession();
    const {  monthlySalary,  address, phone, fatherName, memberID, name, email, password, imgUrl } = req.body;
    
    try {

        const userNewData = {name, email, password, phone, role: "trainer", imgUrl, address, fatherName, memberID  };
    
        
        // Begin Transaction
        session.startTransaction();
        
        const userData = await UserModel.create([userNewData], {session});

        const salaryData = await SalaryModel.create([{
            userID: userData[0]._id,
            monthlySalary: monthlySalary,
        }], {session})


        // // Transaction Success
        await session.commitTransaction();
        session.endSession();
        
        
        return {status:"success", salaryData, userData};


    } catch (error) {

        return {status:"fail", data:error.toString()}

    }

};


module.exports = CreateTrainerService