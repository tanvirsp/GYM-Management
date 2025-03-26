const SalaryModel = require("../../Models/SalaryModel");
const TrainerModel = require("../../Models/TrainerModel");

const mongoose = require("mongoose");
const ObjectID= mongoose.Types.ObjectId;

const UpdateTrainerService = async(req) =>{

    try {
        

        const reqBody = req.body
        const id = new ObjectID(req.params.id);
        const data = await TrainerModel.updateOne({_id: id}, reqBody )
            await SalaryModel.updateOne({trainerID: id}, {monthlySalary: reqBody.salary} )
        
        return {status:"success", data: data};

    } catch (error) {

        return {status:"fail", data:error.toString()}

    }

};


module.exports = UpdateTrainerService
