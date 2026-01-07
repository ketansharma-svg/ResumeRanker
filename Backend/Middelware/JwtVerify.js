import jwt from "jsonwebtoken";




export default function JwtVerify(req,res,next){
        try{
          let token=req.cookies.token
          console.log("token",token)
          if(!token)return res.status(401).json({message:"Token not found"})

let decoded= jwt.verify(token,process.env.SECRET_KEY

)
req.userId=decoded.id
console.log("decoded",decoded)

        
next()


        }catch{
          res.status(500).json({message:"Internal server Error"})
        }

}