


const DueModel = require("../Models/DueModel");
const { CreateService } = require("../Services/CommonServices/CreateService");
const { DetailsByIdService } = require("../Services/CommonServices/DetailsByIDService");
const ListService = require("../Services/CommonServices/ListService");
const { UpdateService } = require("../Services/CommonServices/UpdateService");



exports.CreateDue = async( req, res) =>{
    const result = await CreateService(req, DueModel);

    res.status(200).json(result)
}



exports.DueList = async( req, res) =>{
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"};
    let SearchArray=[{note: SearchRgx}, {status: SearchRgx}]
    const result = await ListService(req, DueModel, SearchArray );

    res.status(200).json(result)
}




exports.DueByID = async( req, res) =>{
    const result = await DetailsByIdService(req, DueModel);

    res.status(200).json(result)
}



exports.DueUpdate = async( req, res) =>{
    const result = await UpdateService(req, DueModel);

    res.status(200).json(result)
}