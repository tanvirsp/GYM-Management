const mongoose = require("mongoose");


const dataSchema = mongoose.Schema( {
    userID: {type: mongoose.Schema.Types.ObjectId, required: true},
    memberID: {type: String, required: true },
    packageID: {type: mongoose.Schema.Types.ObjectId, required: true},
    status: {type: String, default: "1"},
    expireDate: {type: Date, required: true},
    services: [
        {  
            _id: {type: mongoose.Schema.Types.ObjectId },
        }
    ],
   

}, {timestamps: true, versionKey:false});



const MembersModel = mongoose.model("members", dataSchema );

module.exports = MembersModel