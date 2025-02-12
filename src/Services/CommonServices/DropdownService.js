exports.DropdownService = async(req, DataModel, Projection) =>{

    try {
        
        const data = await DataModel.aggregate([
            {
                $project: Projection
            }
        ])
        
        return {status:"success", data: data};

    } catch (error) {

        return {status:"fail", data:error.toString()}

    }

}
