const { jwtTokenError, noJwtToken, notAuthorized } = require("../JsonResponses/error")
const JWT_SECRET = process.env.JWT_SECRET
const jwt = require("jsonwebtoken")
const { getEmailFromUserId } = require("../utils/admin.utils")

async function onlyAdminAllowed(req, res, next) {
    const token = req.cookies.jwt
  
    if (!token) {
      return res.status(400).json(noJwtToken)
    }
  
    jwt.verify(token, JWT_SECRET, async function (err, decoded) {
      if (err) {
        return res.status(400).json(jwtTokenError)
      }
      const adminId =  decoded.userId;
      const email = await getEmailFromUserId(adminId)
       if(email !== process.env.ADMIN_EMAIL){
        return res.status(401).json(notAuthorized)
       }
      next()
    })
  }

module.exports={
  onlyAdminAllowed 
}