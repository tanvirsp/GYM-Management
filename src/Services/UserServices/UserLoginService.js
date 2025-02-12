const bcrypt = require('bcrypt');
const { EncodeToken } = require('../../Utility/TokenUtility');

const UserLoginService = async(req, dataModel) =>{

    try {
        const {email, password} = req.body;

    

         //Validate Request
       if(!email || !password){
        return {status:"fail", message: "Please Enter email and password"}
       };

       // Check if user exists
       const user = await dataModel.findOne({ email });
       
       if(!user){
           return {status:"fail", message: "User not found, please Signup"}
       };


       // User exists, check if password is correct
       const passwordIsCorrect = await bcrypt.compare(password, user.password);


       if( user && passwordIsCorrect){
        
        
            // User Token Create
            const token=EncodeToken(email, user.role, user._id.toString() );
            return {status:"success", token: token}

        } else {
            return {status:"fail", message: "Invalid email or password"}
        }



    } catch (error) {
        return {status:"fail", data:error.toString()}
    }

};

module.exports = UserLoginService