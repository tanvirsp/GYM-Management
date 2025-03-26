const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, required: true},
    amount:{type:Number},
    status:{type:String, default: 'due'},
    note:{type:String},
   

}, {timestamps:true,versionKey:false})



const DueModel = mongoose.model("dues",dataSchema );
module.exports = DueModel