const {JWT_secret} = require('./config');
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next)=>{
    const authHeaders = req.headers.authorization
    if(!authHeaders || !authHeaders.startsWith('Bearer ')){
        res.status(403).json({})
    }
    const token = authHeaders.split(' ')[1]
    try {
        const decoded = jwt.verify(token, JWT_secret);
        req.userId = decoded.userId
        next()
    } catch(err){
        res.status(403).json({
            message: "Bhag jaa yaha se"
        })
        return 
    }
}

module.exports = {
    authMiddleware
}