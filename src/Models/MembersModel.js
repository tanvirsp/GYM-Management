const mongoose = require("mongoose");


const dataSchema = mongoose.Schema( {
    memberID: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    fatherName: {type: String, required: true},
    address: {type: String, required: true},
    contactNumber: {type: String, required: true},
    package: {type: String, required: true},
    imageUrl: {type: String},
    status: {type: String, default: "1"},
    expireDate: {type: Date},



}, {timestamps: true, versionKey:false});



const MembersModel = mongoose.model("members", dataSchema );

module.exports = MembersModel