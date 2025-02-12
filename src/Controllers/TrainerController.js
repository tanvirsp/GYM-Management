const TrainerModel = require("../Models/TrainerModel");
const { CreateService } = require("../Services/CommonServices/CreateService");
const { DetailsByIdService } = require("../Services/CommonServices/DetailsByIDService");
const { DropdownService } = require("../Services/CommonServices/DropdownService");
const ListService = require("../Services/CommonServices/ListService");
const { UpdateService } = require("../Services/CommonServices/UpdateService");

exports.CreateTrainer = async( req, res) =>{
    const result = await CreateService(req, TrainerModel);

    res.status(200).json(result)
}


exports.TrainerDropdown = async( req, res) =>{
    const Projection = {updatedAt: 0, createdAt: 0, address: 0, status: 0, phone: 0, trainerID: 0, workingTime: 0, fatherName: 0 }
    const result = await DropdownService(req, TrainerModel, Projection);

    res.status(200).json(result)
}




exports.TrainerList = async( req, res) =>{
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let SearchArray=[{name: SearchRgx}, {phone: SearchRgx} ]
    const result = await ListService(req, TrainerModel, SearchArray );

    res.status(200).json(result)
}




exports.UpdateTrainer = async( req, res) =>{
    const result = await UpdateService(req, TrainerModel);

    res.status(200).json(result)
}



exports.TrainerDetailsByID = async( req, res) =>{
    const result = await DetailsByIdService(req, TrainerModel);

    res.status(200).json(result)
}