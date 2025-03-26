const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    amount: {type:Number, required: true},
    type: { type: String, enum: ["advance", "salary","paid-advance"] },
    note: { type: String },
    date: { type: Date, default: Date.now },

  }, {timestamps: true, versionKey:false});
  
const SalaryTransactionModel = mongoose.model("salary-transaction", dataSchema );

module.exports = SalaryTransactionModel