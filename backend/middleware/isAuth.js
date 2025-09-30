import jwt from "jsonwebtoken";

const isAuth = async(req,res,next)=>{
      try {
            let token = req.cookies.token
            console.log(token)
            if(!token)
            {
                  return res.status(401).json({message : "User does not have Token"})
            }
            let verifyToken = jwt.verify(token,process.env.JWT_SECRET )
            if(!verifyToken)
            {
                  return res.status(401).json({message : "Invalid Token"})
            }
           
            req.userId = verifyToken.userId
           
            next()
      } 
      catch (error) {
            console.log("is Auth error")
            return res.status(500).json({message : `is Auth error ${error.message}`})
      }
}

export default isAuth