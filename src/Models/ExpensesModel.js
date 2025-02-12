const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    typeID: {type: mongoose.Schema.Types.ObjectId, required: true},
    amount:{type:Number},
    note:{type:String},
   

}, {timestamps:true,versionKey:false})






const ExpensesModel = mongoose.model("expenses",dataSchema );

module.exports = ExpensesModel