const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    name: {type: String, required: true},
    slug: {type: String, required: true},
   

}, {timestamps:true,versionKey:false})






const ExpenseTypesModel = mongoose.model("expense-types",dataSchema );

module.exports = ExpenseTypesModel