const AdvanceListService = require("../Services/SalaryServices/AdvanceListService");
const CreateAdvanceSalaryService = require("../Services/SalaryServices/CreateAdvanceSalaryService");
const CreateSalaryService = require("../Services/SalaryServices/CreateSalaryService");
const SalaryListService = require("../Services/SalaryServices/SalaryListService");





exports.CreateSalary = async( req, res) =>{
    const result = await CreateSalaryService(req);

    res.status(200).json(result)
}



exports.CreateAdvanceSalary = async( req, res) =>{
    const result = await CreateAdvanceSalaryService(req);

    res.status(200).json(result)
}


exports.SalaryList = async( req, res) =>{
    const result = await SalaryListService(req);

    res.status(200).json(result)
}

exports.AdvanceList = async( req, res) =>{
    const result = await AdvanceListService(req);

    res.status(200).json(result)
}
