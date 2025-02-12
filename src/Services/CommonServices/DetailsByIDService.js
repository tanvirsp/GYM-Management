const mongoose = require("mongoose");
const ObjectID= mongoose.Types.ObjectId;


exports.DetailsByIdService = async(req, dataModel) =>{

    try {
        
        const detailsID = new ObjectID(req.params.id);

        const data = await dataModel.aggregate([
            {
                $match: {_id: detailsID }
            }
        ])
        
        return {status:"success", data: data};

    } catch (error) {

        return {status:"fail", data:error.toString()}

    }

}
