const mongoose = require("mongoose");


const dataSchema = mongoose.Schema( {
    gymID: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    fatherName: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    imgUrl: {type: String, default: "" },
    status: {type: String, default: "1" },
    workingTime: {type: String, required: true },
   
}, {timestamps: true, versionKey:false});



const TrainerModel = mongoose.model("trainer", dataSchema );

module.exports = TrainerModel