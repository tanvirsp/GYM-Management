const { AddMemberService, MemberListService,  UpdateMemberService } = require("../Services/MemberServices");


exports.AddMember = async( req, res) =>{
    const result = await AddMemberService(req);

    res.status(200).json(result)
}


exports.MemberList = async( req, res) =>{
    const result = await MemberListService(req);

    res.status(200).json(result)
}



exports.UpdateMember = async( req, res) =>{
    const result = await UpdateMemberService(req);

    res.status(200).json(result)
}
