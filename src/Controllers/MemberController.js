const DueModel = require("../Models/DueModel");
const MembersModel = require("../Models/MembersModel");
const PaymentModel = require("../Models/PaymentModel");

const { UpdateService } = require("../Services/CommonServices/UpdateService");
const CreateMemberService = require("../Services/MemberServices/CreateMemberService");
const MemberDetailService = require("../Services/MemberServices/MemberDetailService");
const MemberDueListService = require("../Services/MemberServices/MemberDueListService");
const MemberListService = require("../Services/MemberServices/MemberListService");
const MemberPaymentListService = require("../Services/MemberServices/MemberPaymentListService");
const MemberUpdateService = require("../Services/MemberServices/MemberUpdateService");

exports.CreateMember = async( req, res) =>{
    const result = await CreateMemberService(req);

    res.status(200).json(result)
}




exports.MemberList = async( req, res) =>{
    const SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    const SearchArray=[{name: SearchRgx}, {memberID: SearchRgx}, {contactNumber: SearchRgx}  ]
    const result = await MemberListService(req, MembersModel, SearchArray);

    res.status(200).json(result)
}



exports.MemberUpdate = async( req, res) =>{
    const result = await MemberUpdateService(req);
    res.status(200).json(result)
}

exports.MemberDetailsByID = async( req, res) =>{
    const result = await MemberDetailService(req);
    res.status(200).json(result)
}



exports.MemberPaymentList = async( req, res) =>{
    
    const result = await MemberPaymentListService(req, PaymentModel);
    res.status(200).json(result)
}


exports.MemberDueList = async( req, res) =>{
    
    const result = await MemberDueListService(req, DueModel);
    res.status(200).json(result)
}

