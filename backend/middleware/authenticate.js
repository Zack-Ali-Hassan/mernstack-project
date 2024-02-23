import Jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
export const authenticate = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token) return res.status(403).send("access_denied please login");
    const decoded =Jwt.verify(token, JWT_SECRET);
    console.log("decoded id is : " + decoded._id)
    req.user =decoded;
    next();
}