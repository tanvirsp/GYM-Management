const UserModel = require("../../Models/UserModel");

const UserListService =  async(req) =>{
    
    try {
       
        const data =  await UserModel.find({}, {password: 0, updatedAt: 0});
        return {status:"success", data: data}

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}


module.exports=UserListService