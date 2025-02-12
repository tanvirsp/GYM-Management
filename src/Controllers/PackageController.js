const MembersModel = require("../Models/MembersModel");
const PackageModel = require("../Models/PackageModel");
const { CreateService } = require("../Services/CommonServices/CreateService");
const DeleteService = require("../Services/CommonServices/DeleteService");
const { DetailsByIdService } = require("../Services/CommonServices/DetailsByIDService");
const { DropdownService } = require("../Services/CommonServices/DropdownService");
const ListService = require("../Services/CommonServices/ListService");
const { UpdateService } = require("../Services/CommonServices/UpdateService");


exports.CreatePackage = async( req, res) =>{
    const result = await CreateService(req, PackageModel);

    res.status(200).json(result)
}


exports.PackageDropdown = async( req, res) =>{
    const Projection = {updatedAt: 0, createdAt: 0, }
    const result = await DropdownService(req, PackageModel, Projection);

    res.status(200).json(result)
}



exports.PackageList = async( req, res) =>{
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let SearchArray=[{name: SearchRgx}]
    const result = await ListService(req, PackageModel, SearchArray );

    res.status(200).json(result)
}




exports.PackageDetails = async( req, res) =>{
    const result = await DetailsByIdService(req, PackageModel);

    res.status(200).json(result)
}



exports.UpdatePackage = async( req, res) =>{
    const result = await UpdateService(req, PackageModel);

    res.status(200).json(result)
}


exports.DeletePackage = async( req, res) =>{
    const result = await DeleteService(req, PackageModel, MembersModel);

    res.status(200).json(result)
}