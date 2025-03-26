
const mongoose = require("mongoose");
const PaymentModel = require("../../Models/PaymentModel");
const DueModel = require("../../Models/DueModel");
const MembersModel = require("../../Models/MembersModel");
const ObjectID= mongoose.Types.ObjectId;


const CreatePaymentService = async(req) =>{

    

    try {
        
        const reqBody = req.body
        
        //Adding Payment to Payment DB
        const data = await PaymentModel.create(reqBody )


        //Updating Member Expire Date to Member DB
        await MembersModel.updateOne({userID: new ObjectID(reqBody.userID) }, {expireDate: reqBody.expireDate, status: "1"})



        //Updating Due Status to Due DB
        const HaveDue = reqBody.haveDue;
        if(HaveDue === true) {
            const DueIDs = reqBody.dueIDs
            DueIDs.forEach( async(item) => {
                await DueModel.updateOne({_id: new ObjectID(item) }, {status: "paid"})
            });
        }

        
        return {status:"success", data: data};

    } catch (error) {

        return {status:"fail", data:error.toString()}

    }

}

module.exports = CreatePaymentService