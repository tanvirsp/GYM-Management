const mongoose = require("mongoose");


const dataSchema = mongoose.Schema( {
    name: {type: String, required: true, },
    price: {type: String, required: true},
    duration: {type: String, required: true},
	imgUrl: {type: String},
   

}, {timestamps: true, versionKey:false});



const PackageModel = mongoose.model("packages", dataSchema );

module.exports = PackageModel