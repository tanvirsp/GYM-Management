

const ExpensesModel = require("../Models/ExpensesModel");
const { CreateService } = require("../Services/CommonServices/CreateService");
const { DetailsByIdService } = require("../Services/CommonServices/DetailsByIDService");
const { DropdownService } = require("../Services/CommonServices/DropdownService");
const ListService = require("../Services/CommonServices/ListService");
const { UpdateService } = require("../Services/CommonServices/UpdateService");



exports.CreateExpense = async( req, res) =>{
    const result = await CreateService(req, ExpensesModel);

    res.status(200).json(result)
}



exports.ExpenseList = async( req, res) =>{
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"};
    console.log(SearchRgx);
    let SearchArray=[{note: SearchRgx}, {amount: SearchRgx}]
    const result = await ListService(req, ExpensesModel, SearchArray );

    res.status(200).json(result)
}




exports.ExpenseDetails = async( req, res) =>{
    const result = await DetailsByIdService(req, ExpensesModel);

    res.status(200).json(result)
}



exports.ExpenseUpdate = async( req, res) =>{
    const result = await UpdateService(req, ExpensesModel);

    res.status(200).json(result)
}