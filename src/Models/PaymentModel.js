const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    memberID:{type: mongoose.Schema.Types.ObjectId, required: true},
    amount:{type:Number},
    note:{type:String},
   

}, {timestamps:true,versionKey:false})


const PaymentModel = mongoose.model("payments",dataSchema );
module.exports = PaymentModel