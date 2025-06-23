const DueReportService = require("../Services/ReportServices/DueReportService");
const ExpenseReportService = require("../Services/ReportServices/ExpenseReportService");
const IncomeReportService = require("../Services/ReportServices/IncomeReportService");

exports.IncomeReport = async( req, res) =>{
    const result = await IncomeReportService(req);

    res.status(200).json(result)
}


exports.ExpenseReport = async( req, res) =>{
    const result = await ExpenseReportService(req);
    res.status(200).json(result)
}

exports.DueReport = async( req, res) =>{
    const result = await DueReportService(req);
    res.status(200).json(result)
}