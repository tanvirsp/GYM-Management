const UserCreateService =async(req, dataModel) =>{
    try {
        const reqBody = req.body;
        const userExit = await dataModel.find({email: reqBody.email});
        
        
        if(userExit.length > 0){
            return {status:"fail", data: `This ${reqBody.email} email is already used`}
        }

        await dataModel.create(reqBody);
        return {status:"success", message:"User Created Successfully"}


    } catch (error) {
        return {status:"fail",  data:error.toString()}
        
    }
};


module.exports=UserCreateService