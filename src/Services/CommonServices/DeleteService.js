const mongoose = require("mongoose");
const ObjectID= mongoose.Types.ObjectId;

const DeleteService = async(req, dataModel, associateModel) =>{

    try {

        const id = new ObjectID(req.params.id);

        const associate = await associateModel.find({packageID: id}).count();
        if(associate > 0){
            return {status:"associate", message: "Sorry this data associate with members"};
        }

        const data = await dataModel.deleteOne({_id: id})


      
        
        
        return {status:"success", data: data};

    } catch (error) {

        return {status:"fail", data:error.toString()}

    }

}

module.exports= DeleteService;