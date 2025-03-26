const ExpensesModel = require("../../Models/ExpensesModel");
const SalaryModel = require("../../Models/SalaryModel");
const SalaryTransactionModel = require("../../Models/SalaryTransactionModel");


const CreateSalaryService = async(req) =>{
    
    const {amount, userID, payFormAdvance, advanceAmount, note, typeID } = req.body;
    console.log(req.body);
    
    
    try {
    
        const SalaryDetails = await SalaryModel.findOne({userID: userID });
      

        if(payFormAdvance === true){
            const newDueAmount = SalaryDetails.dueAmount - (Number(amount) + Number(advanceAmount));
            const newAdvanceAmount = SalaryDetails.advanceAmount -  Number(advanceAmount);
            
            const result = await SalaryModel.updateOne({userID: userID }, {dueAmount: newDueAmount, advanceAmount: newAdvanceAmount });
            await SalaryTransactionModel.create({userID, amount, type:"salary", note: note})
            await SalaryTransactionModel.create({userID, amount: advanceAmount, type:"paid-advance", note: "Salary pay from advance"});

            await ExpensesModel.create({typeID, amount, note})
            

            return {status:"success", data: result};
            


        } else {
            const newDueAmount = SalaryDetails.dueAmount - Number(amount);
            const result = await SalaryModel.updateOne({userID: userID }, {dueAmount: newDueAmount });

            await SalaryTransactionModel.create({userID, amount, type:"salary", note: note})
            await ExpensesModel.create({typeID, amount, note})

            return {status:"success", data: result};     
        }



    } catch (error) {

        return {status:"fail", data:error.toString()}

    }

};


module.exports = CreateSalaryService