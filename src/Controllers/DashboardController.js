const MonthlyReportService = require("../Services/DashboardServices/MonthlyReportService");
const TotalService = require("../Services/DashboardServices/TotalService");


exports.Total = async( req, res) =>{

    const result = await TotalService(req );
    res.status(200).json(result)
}


exports.MonthlyReport = async( req, res) =>{

    const result = await MonthlyReportService(req );
    res.status(200).json(result)
}

