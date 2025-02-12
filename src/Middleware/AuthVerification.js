const { DecodeToken } = require("../Utility/TokenUtility");


module.exports=(req,res,next)=>{

    // Receive Token
    let token=req.headers['token']
    if(!token){
        token=req.cookies['token']
    }

  // Token Decode
  const decoded=DecodeToken(token);
 
  // Request Header Email+UserID Add
  if(decoded===null){
      return res.status(401).json({status:"fail", message:"Unauthorized User"})
  }
  else {
    const email=decoded['email'];
    const userId=decoded['userId'];
    const role=decoded['role'];
    const instituteId=decoded['instituteId'];

    req.headers.email=email;
    req.headers.userId=userId;
    req.headers.role=role;
    req.headers.role=role;
    req.headers.instituteId=instituteId;

    next();
  }
}