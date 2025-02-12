const MembersModel = require("../Models/MembersModel");
const { CreateService } = require("../Services/CommonServices/CreateService");
const { UpdateService } = require("../Services/CommonServices/UpdateService");
const MemberDetailService = require("../Services/MemberServices/MemberDetailService");
const MemberListService = require("../Services/MemberServices/MemberListService");

exports.CreateMember = async( req, res) =>{
    const result = await CreateService(req, MembersModel);

    res.status(200).json(result)
}




exports.MemberList = async( req, res) =>{
    const SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    const SearchArray=[{name: SearchRgx}, {memberID: SearchRgx}, {contactNumber: SearchRgx}  ]
    const result = await MemberListService(req, MembersModel, SearchArray);

    res.status(200).json(result)
}



exports.MemberUpdate = async( req, res) =>{
    const result = await UpdateService(req, MembersModel);
    res.status(200).json(result)
}

exports.MemberDetailsByID = async( req, res) =>{
    const result = await MemberDetailService(req, MembersModel);
    res.status(200).json(result)
}
