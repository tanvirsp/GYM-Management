const mongoose = require("mongoose");

const salarySchema = mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    monthlySalary: { type: Number, required: true },
    advanceAmount: { type: Number, default: 0 },
    dueAmount: { type: Number, default: 0 },
   

  }, {timestamps: true, versionKey:false});
  
  const SalaryModel= mongoose.model("salary", salarySchema);


  module.exports = SalaryModel;