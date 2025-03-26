const cron = require("node-cron");
const MembersModel = require("../Models/MembersModel");
const SalaryModel = require("../Models/SalaryModel");



// Schedule the job to run on the last day of the month at 23:59
cron.schedule("0 0 1 * *", async () => {
    const now = new Date();

    try {
      // Update members whose expiredDate has passed and change status "0"
      const result = await MembersModel.updateMany(
        { expireDate: { $lt: now }, status: "1" },
        { $set: { status: "0" } }
      );


       // Update Trainer Salary
      const salaries = await SalaryModel.find({}); 
      salaries.forEach( async(item) =>{
        const newDue = item.dueAmount + item.monthlySalary;
        await SalaryModel.updateOne({_id: item._id}, {$set: {dueAmount: newDue}} );  
      } )

    

      console.log(`Expired members updated: ${result.modifiedCount}`);
    } catch (error) {
      console.error("Error updating expired members:", error);
    }
  
});


console.log("Cron job for updating expired members is scheduled.");


// ( (async()=>{
  
// }))()