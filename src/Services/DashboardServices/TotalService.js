const DueModel = require("../../Models/DueModel");
const ExpensesModel = require("../../Models/ExpensesModel");
const MembersModel = require("../../Models/MembersModel");
const PaymentModel = require("../../Models/PaymentModel");
const SalaryModel = require("../../Models/SalaryModel");
const UserModel = require("../../Models/UserModel");

const TotalService = async(req) =>{

    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999);

    try {
        
        
        const trainer = await UserModel.aggregate([
            {$match:{ role: "trainer"}},
            {$count: "count"}
        ]);
        
        const admin = await UserModel.aggregate([
            {$match:{ role: "admin"}},
            {$count: "count"}
        ]);

        const activeMember = await MembersModel.aggregate([
            {$match:{ status: "1"}},
            {$count: "count"}
        ]);

        const expireMember = await MembersModel.aggregate([
            {$match:{ status: "0"}},
            {$count: "count"}
        ]);

        const totalDue = await DueModel.aggregate([
            {$match: {status: "due" }},
            {
                $group: {
                        _id: null,
                        totalDue: {$sum: "$amount"}

                }
            }
        ]);

    


        const totalExpense = await ExpensesModel.aggregate([
            {$match: {createdAt:{$gte: startOfMonth, $lte:endOfMonth }}},
            {
                $group: {
                        _id: null,
                        totalExpense: {$sum: "$amount"}
                }
            }
        ]);


        const salaryDue = await SalaryModel.aggregate([
            {
                $group: {
                        _id: null,
                        totalSalaryDue: {$sum: "$dueAmount"}
                }
            }
        ]);


        const totalCollection = await PaymentModel.aggregate([
            {$match: {createdAt:{$gte: startOfMonth, $lte:endOfMonth }}},
            {
                $group: {
                        _id: null,
                        totalPayment: {$sum: "$amount"}
                }
            }
        ]);

        


        return {status:"success", 
                trainers: trainer[0]? trainer[0].count: 0,
                activeMembers: activeMember[0]? activeMember[0].count: 0,
                expireMembers: expireMember[0]?  expireMember[0].count: 0,
                admins: admin[0]? admin[0].count: 0,
                totalDue: totalDue[0] ? totalDue[0].totalDue: 0,
                totalExpense: totalExpense[0]? totalExpense[0].totalExpense: 0,
                salaryDue: salaryDue[0] ? salaryDue[0].totalSalaryDue: 0,
                totalCollection: totalCollection[0] ? totalCollection[0].totalPayment: 0,
            };

    } catch (error) {

        return {status:"fail", data:error.toString()}

    }

}

module.exports=TotalService
