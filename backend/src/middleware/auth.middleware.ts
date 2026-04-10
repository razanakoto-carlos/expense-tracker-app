import type {Response, Request, NextFunction} from "express"
import jwt from "jsonwebtoken"

export const authMiddleware = (req:Request,res:Response,next:NextFunction) =>{
    const headers = req.headers.authorization

    if(!headers || !headers.startWith("Bearer")){
        return res.status(401).json("Not authorized")
    }

    const token = headers.split("")[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if(!decoded){
        return res.status(401).json("Not authorized, Invalid Token")
    }

    req.body = decoded

    next()
}