

const ExpenseTypesModel = require("../Models/ExpsnseTypesModel");
const { CreateService } = require("../Services/CommonServices/CreateService");
const { DetailsByIdService } = require("../Services/CommonServices/DetailsByIDService");
const { DropdownService } = require("../Services/CommonServices/DropdownService");
const ListService = require("../Services/CommonServices/ListService");
const { UpdateService } = require("../Services/CommonServices/UpdateService");



exports.CreateExpenseType = async( req, res) =>{
    const result = await CreateService(req, ExpenseTypesModel);

    res.status(200).json(result)
}


exports.ExpenseTypeDropdown = async( req, res) =>{
    const Projection = {updatedAt: 0, createdAt: 0, }
    const MatchState = {$match: {}}
    const result = await DropdownService(req, ExpenseTypesModel, Projection, MatchState);

    res.status(200).json(result)
}



exports.ExpenseTypeList = async( req, res) =>{
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let SearchArray=[{name: SearchRgx}]
    const result = await ListService(req, ExpenseTypesModel, SearchArray );

    res.status(200).json(result)
}




exports.ExpenseTypeDetails = async( req, res) =>{
    const result = await DetailsByIdService(req, ExpenseTypesModel);

    res.status(200).json(result)
}



exports.ExpenseTypeUpdate = async( req, res) =>{
    const result = await UpdateService(req, ExpenseTypesModel);

    res.status(200).json(result)
}