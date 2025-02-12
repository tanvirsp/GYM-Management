const mongoose = require("mongoose");


const dataSchema = mongoose.Schema( {
    imgUrl: {type: String},
    name: {type: String, required: true, },
    price: {type: String, required: true},
	duration: {type: String, required: true},
   

}, {timestamps: true, versionKey:false});



const ServicesModel = mongoose.model("services", dataSchema );

module.exports = ServicesModel