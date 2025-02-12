const mongoose = require("mongoose");


const dataSchema = mongoose.Schema( {
    imageUrl: {type: String},
    name: {type: String, required: true},
    memberID: {type: String, required: true, },
    fatherName: {type: String, required: true},
    address: {type: String, required: true},
    contactNumber: {type: String, required: true},
    packageID: {type: mongoose.Schema.Types.ObjectId, required: true},
    trainerID: {type: mongoose.Schema.Types.ObjectId },
    status: {type: String, default: "1"},
    expireDate: {type: Date, required: true},
    services: [
        {  
            serviceID: {type: mongoose.Schema.Types.ObjectId },
        }
    ],
   

}, {timestamps: true, versionKey:false});



const MembersModel = mongoose.model("members", dataSchema );

module.exports = MembersModel