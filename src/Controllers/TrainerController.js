const TrainerModel = require("../Models/TrainerModel");
const UserModel = require("../Models/UserModel");
const { DropdownService } = require("../Services/CommonServices/DropdownService");
const CreateTrainerService = require("../Services/TrainerServices/CreateTrainerService");
const TrainerDetailsService = require("../Services/TrainerServices/TrainerDetailsService");
const TrainerListService = require("../Services/TrainerServices/TrainerListService");
const UpdateTrainerService = require("../Services/TrainerServices/UpdateTrainerService");

exports.CreateTrainer = async( req, res) =>{
    const result = await CreateTrainerService(req);

    res.status(200).json(result)
}


exports.TrainerDropdown = async( req, res) =>{
    const Projection = {updatedAt: 0, createdAt: 0, address: 0, status: 0, phone: 0, trainerID: 0, workingTime: 0, fatherName: 0 };
    const MatchState = {$match: {role: "trainer"}}
    const result = await DropdownService(req, UserModel, Projection, MatchState);

    res.status(200).json(result)
}




exports.TrainerList = async( req, res) =>{
   
    const result = await TrainerListService(req);

    res.status(200).json(result)
}




exports.UpdateTrainer = async( req, res) =>{
    const result = await UpdateTrainerService(req);

    res.status(200).json(result)
}



exports.TrainerDetailsByID = async( req, res) =>{
    const result = await TrainerDetailsService(req);

    res.status(200).json(result)
}