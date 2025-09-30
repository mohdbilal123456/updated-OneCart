import User from "../models/user.model.js"
import validator from 'validator'
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js"

export const registration = async(req,res)=>{

      try{
            let {name,email,password} = req.body

            let existUser = await User.findOne({email})

            if(!name || !email || !password)
            {
                  return res.json({message : "Fill All Details !!"})
            }
            if(existUser)
            {
                  return res.json({message : "User Already Exists !!"})
            }
            if(!validator.isEmail(email)){
                  return res.json({message : "Enter a Valid Email !!"})
            }

            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

            if(!passwordRegex.test(password)){
                  return res.status(400).json({message : "Password must be at least 8 characters long, include 1 uppercase letter, 1 number, and 1 special character!"})
            }

            const hashPassword = await bcrypt.hash(password,10)

          

            const user = await User.create({
                  name,email,password:hashPassword
            })
            let token = await genToken(user._id)

            res.cookie("token",token,{
                  httpOnly : true,
                  secure: true,
                  sameSite : 'none',
                  maxAge : 7*24*60*60*1000
            })

            return res.status(200).json(user)

            }
            
      catch (error) {
            console.log(error)
            return res.json({message : error.message})
      }

}

export const login = async(req,res)=>{

      try {

            let {email,password} = req.body

            let existUser = await User.findOne({email})

            if(!existUser)
            {
                  return res.json({message : "User Does not Exits"})
            }

            let isMatch = await bcrypt.compare(password,existUser.password)

            if (!isMatch) {
                  return res.status(500).json({ message: "Incorrect Password !!" })
            }
            let token = await genToken(existUser._id)

            res.cookie("token",token,{
                  httpOnly : true,
                  secure: true,
                  sameSite : 'none',
                  maxAge : 7*24*60*60*1000
            })


            return res.json(existUser)
            

      } catch (error) {
            console.log('Login Error ',error)
            return res.json({message : error.message})
      }

}

export const logOut = async(req,res)=>{

      try {
            res.clearCookie("token",{
                  httpOnly : true,
                  sameSite : "none",
                  secure :true
            })
            return res.status(200).json({ message: "LogOut Successfully!!" })
      } catch (error) {
            return res.status(500).json({ message: `LogOut Error ${error.message}` }) 
      }
}

export const googleLogin = async(req,res)=>{

      try {
            let {name,email} = req.body
            let user = await User.findOne({email})
            if(!user){
                  user = await User.create({name,email})
            }
            let token = await genToken(user._id)

            res.cookie("token",token,{
                  httpOnly : true,
                  sameSite : 'none',
                  secure :true,
                  maxAge: 7 * 24 * 60 * 60 * 1000
            })
            console.log(user)
            return res.status(201).json(user)
      } 
      catch (error) {
            console.log("Google Login Error")
            return res.status(500).json({ message: `Login Error ${error.message}` })
      }
}


export const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // token banate waqt sirf email + role daalo
      let token = await genToken1({
        email,
        role: "admin"
      });

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 1 * 24 * 60 * 60 * 1000
      });

      return res.status(200).json({ token });
    }

    return res.status(400).json({ message: "Invalid Credentials !!" });
  } catch (error) {
    console.log("Admin Login Error", error);
    return res.status(500).json({ message: `Admin Error ${error.message}` });
  }
};
