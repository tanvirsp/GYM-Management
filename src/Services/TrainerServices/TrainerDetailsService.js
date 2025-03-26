const TrainerModel = require("../../Models/TrainerModel");
const mongoose = require("mongoose");
const UserModel = require("../../Models/UserModel");
const ObjectID= mongoose.Types.ObjectId;


const TrainerDetailsService = async(req) =>{
    try {


        const id = new ObjectID(req.params.id);
        const data = await UserModel.aggregate([
            { $match: {_id: id }},
            { $lookup: {from: "salaries", localField: "_id", foreignField: "userID", as: "salary" }},
            {$unwind: "$salary"},
            {$project: { "salary._id": 0,  "salary.createdAt": 0,  "salary.updatedAt": 0, "salary.userID": 0, password: 0, updatedAt: 0}},
        ])

        return {status:"success", data};



    } catch (error) {
        return {status:"fail", data:error.toString()}
    }

}


module.exports = TrainerDetailsService