const MembersModel = require("../Models/MembersModel");




exports.AddMemberService = async(req) =>{

    try {
        const reqBody = req.body;
        const totalMember = await MembersModel.find({}).count();
        reqBody.memberID = totalMember + 1

        const data = await MembersModel.create(reqBody);

        return {status:"success", data: data};

    } catch (error) {

        return {status:"fail", data:error.toString()}

    }

}


exports.MemberListService = async(req) =>{

    try {
        
        const data = await MembersModel.find({})
        return {status:"success", data: data};

    } catch (error) {

        return {status:"fail", data:error.toString()}

    }

}


exports.UpdateMemberService = async(req) =>{

    try {
        const id = req.params.memberID;
        const reqBody = req.body
        const data = await MembersModel.updateOne({memberID: id }, {$set: reqBody} )
        
        return {status:"success", data: data};

    } catch (error) {

        return {status:"fail", data:error.toString()}

    }

}


