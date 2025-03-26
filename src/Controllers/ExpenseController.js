

const ExpensesModel = require("../Models/ExpensesModel");
const { CreateService } = require("../Services/CommonServices/CreateService");
const { DetailsByIdService } = require("../Services/CommonServices/DetailsByIDService");
const ListServiceWithTwoCollection = require("../Services/CommonServices/ListServiceWithTwoCollection");
const { UpdateService } = require("../Services/CommonServices/UpdateService");



exports.CreateExpense = async( req, res) =>{
    const result = await CreateService(req, ExpensesModel);

    res.status(200).json(result)
}



exports.ExpenseList = async( req, res) =>{
    const SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"};
    const SearchArray=[{note: SearchRgx}, {amount: SearchRgx}];
    const JoiningStage = {from: "expense-types", localField: "typeID", foreignField: "_id", as: "type"} ;
    const Projection = {updatedAt: 0, "type._id": 0, "type.createdAt": 0,  "type.updatedAt": 0 }

    const result = await ListServiceWithTwoCollection(req, ExpensesModel, SearchArray, JoiningStage, Projection );

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