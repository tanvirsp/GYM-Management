exports.CreateService = async(req, dataModel) =>{

    try {
        
        const reqBody = req.body
        const data = await dataModel.create(reqBody )
        
        return {status:"success", data: data};

    } catch (error) {

        return {status:"fail", data:error.toString()}

    }

}
