const jwt=require('jsonwebtoken');

exports.EncodeToken=(email, role, userId)=>{
    
    let EXPIRE={expiresIn: '24h'}
    let PAYLOAD={email, role, userId}
    return jwt.sign(PAYLOAD, process.env.ACCESS_TOKEN, EXPIRE)
}

exports.DecodeToken=(token)=>{
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN)
    }
    catch (e) {
        return null
    }
}