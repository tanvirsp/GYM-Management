exports.DropdownService = async(req, DataModel, Projection, MatchState) =>{

    try {
        
        const data = await DataModel.aggregate([
            MatchState,
            { $project: Projection }
        ])
        
        return {status:"success", data: data};

    } catch (error) {

        return {status:"fail", data:error.toString()}

    }

}
