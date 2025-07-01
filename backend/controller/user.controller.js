import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import config from "../config.js";
// import validateEmailWithZeroBounce from "../utils/validateEmail.js";



export const signup =async (req,res)=>{
    const {firstName,lastName,email,password}=req.body;
    try {
        
        // const emailCheck = await validateEmailWithZeroBounce(email);
        // console.log(emailCheck)
        // const riskyStatuses = ["invalid", "do_not_mail", "abuse", "spamtrap"];
        //     if (riskyStatuses.includes(emailCheck.status)) {
        //   return res.status(400).json({ message: `Email rejected: ${emailCheck.status}` });
        //     }

        const user =await User.findOne({email:email});
        
        
        if(user){
            return res.status(401).json({error:"User already exist"})
        }
        
        
        const hashPassword = await bcrypt.hash(password,10)
        const newUser= new User({
            firstName,
            lastName,
            email,
            password:hashPassword
        })
        await newUser.save()
        return res.status(201).json({message:"User Created Sucessfully"})
    } catch (error) {
        console.log("Error in signup",error)
        res.status(500).json({error:"There is some error in signup"})
    }
};


export const login= async(req,res)=>{
  const {email,password} = req.body;
  try {
    const user = await User.findOne({email:email})
    if(!user ){
        return res.status(403).json({message:"Invalid eamil"})
    }
    const isPasswordcorrect = await bcrypt.compare(password,user.password)
    if(!isPasswordcorrect){
        return res.status(403).json({message:"Invalid password"})
    }
    // jwt token code
    const cookieOption = {
        expires:new Date(Date.now()+24*60*60*1000),
        httpOnly:true,
        // cahnge when deployed
        secure:process.env.NODE_ENV==="production",
        sameSite:"Strict"
        
               }
    const token = jwt.sign({id:user._id},config.JWT_USER_PASSWORD,{
        expiresIn:"1d"
    })
    res.cookie("jwt",token,cookieOption);
    
    return res.status(201).json({message:"User login sucessfully",user,token})
    
  } catch (error) {
    console.log("error in login: ",error)
    res.status(500).json({error:"Error in login"})
  }  
};


export const logout = (req,res)=>{
    try {
        res.clearCookie("jwt")
        return res.status(200).json({message:"logout Sucessfully"})
    } catch (error) {
        console.log("error:",error)
        return res.status(500).json({message:"Error in logout",error})
    }

}
    