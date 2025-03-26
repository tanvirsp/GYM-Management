const ExpensesModel = require("../../Models/ExpensesModel");
const PaymentModel = require("../../Models/PaymentModel");

const MonthlyReportService = async (req) => {
   try {
    
     
    //taking year from frontend
    const year = parseInt(req.params.year);

    const expenses = await ExpensesModel.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(`${year}-01-01`),
              $lt: new Date(`${year + 1}-01-01`),
            }
          }
        },
        {
          $group: {
            _id: { $month: "$createdAt" }, // Extract month from date
            totalExpense: { $sum: "$amount" },
          },
        },
      ]);
    
      const payments = await PaymentModel.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(`${year}-01-01`),
              $lt: new Date(`${year + 1}-01-01`),
            }
          }
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            totalPayment: { $sum: "$amount" },
          },
        },
      ]);
    
      // Merge the two datasets
      const monthlyData = expenses.map(exp => {
        const payment = payments.find(pay => pay._id === exp._id) || { totalPayment: 0 };
        return {
          month: new Date(2025, exp._id - 1, 1).toLocaleString("en-US", { month: "long" }), // Convert month number to name
          expense: exp.totalExpense,
          income: payment.totalPayment,
        };
      });
    
      return {status:"success", data: monthlyData  };



   } catch (error) {
    return {status:"fail", data:error.toString()}
   }
  };
  

  module.exports=MonthlyReportService