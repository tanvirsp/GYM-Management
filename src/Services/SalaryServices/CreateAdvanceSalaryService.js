const ExpensesModel = require("../../Models/ExpensesModel");
const SalaryModel = require("../../Models/SalaryModel");
const SalaryTransactionModel = require("../../Models/SalaryTransactionModel");


const CreateAdvanceSalaryService = async(req) =>{
    
    const {amount, userID, note, typeID } = req.body;
    
    
    
    try {
    
        const SalaryDetails = await SalaryModel.findOne({userID: userID });

        const newAdvanceAmount = SalaryDetails.advanceAmount + Number(amount);
        const result = await SalaryModel.updateOne({userID: userID }, {advanceAmount: newAdvanceAmount });
        await SalaryTransactionModel.create({userID, amount, type:"advance", note});
        await ExpensesModel.create({typeID, amount, note})


        return {status:"success", data: result};     
      



    } catch (error) {

        return {status:"fail", data:error.toString()}

    }

};


module.exports = CreateAdvanceSalaryService