
const MembersModel = require("../Models/MembersModel");
const ServicesModel = require("../Models/ServicesModel");
const { CreateService } = require("../Services/CommonServices/CreateService");
const DeleteService = require("../Services/CommonServices/DeleteService");
const { DetailsByIdService } = require("../Services/CommonServices/DetailsByIDService");
const { DropdownService } = require("../Services/CommonServices/DropdownService");
const ListService = require("../Services/CommonServices/ListService");
const { UpdateService } = require("../Services/CommonServices/UpdateService");



exports.CreateService = async( req, res) =>{
    const result = await CreateService(req, ServicesModel);

    res.status(200).json(result)
}


exports.ServiceDropdown = async( req, res) =>{
    const Projection = {updatedAt: 0, createdAt: 0, }
    const result = await DropdownService(req, ServicesModel, Projection);

    res.status(200).json(result)
}



exports.ServiceList = async( req, res) =>{
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let SearchArray=[{name: SearchRgx}]
    const result = await ListService(req, ServicesModel, SearchArray );

    res.status(200).json(result)
}




exports.ServiceDetails = async( req, res) =>{
    const result = await DetailsByIdService(req, ServicesModel);

    res.status(200).json(result)
}



exports.ServiceUpdate = async( req, res) =>{
    const result = await UpdateService(req, ServicesModel);

    res.status(200).json(result)
}


exports.ServiceDelete = async( req, res) =>{
    const result = await DeleteService(req, ServicesModel, MembersModel);

    res.status(200).json(result)
}