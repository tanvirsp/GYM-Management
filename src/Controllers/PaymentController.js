
const PaymentModel = require("../Models/PaymentModel");
const { DetailsByIdService } = require("../Services/CommonServices/DetailsByIDService");
const ListService = require("../Services/CommonServices/ListService");
const { UpdateService } = require("../Services/CommonServices/UpdateService");
const CreatePaymentService = require("../Services/PaymentServices/CreatePaymentService");



exports.CreatePayment = async( req, res) =>{
    const result = await CreatePaymentService(req);

    res.status(200).json(result)
}



exports.PaymentList = async( req, res) =>{
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"};
    let SearchArray=[{note: SearchRgx}, {status: SearchRgx}]
    console.log(SearchArray);
    const result = await ListService(req, PaymentModel, SearchArray );

    res.status(200).json(result)
}




exports.PaymentByID = async( req, res) =>{
    const result = await DetailsByIdService(req, PaymentModel);

    res.status(200).json(result)
}



exports.PaymentUpdate = async( req, res) =>{
    const result = await UpdateService(req, PaymentModel);

    res.status(200).json(result)
}


