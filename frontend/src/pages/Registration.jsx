import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import google from '../assets/google.png'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { dataContext } from '../context/AuthContext';
import {  toast } from 'react-toastify';
import axios from "axios"
import spin from '../component/Loading';
import { auth, provider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';

export default function Registration() {

  let [show,setShow] = useState(false)
  let navigate = useNavigate()
  let {serverUrl} = useContext(dataContext)

  let [userName,setUserName] = useState("")
  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  let [nameError , setNameError] = useState("")
  let [emailError , setEmailError] = useState("")
  let [passwordError , setPasswordError] = useState("")
  // Regex: at least 1 lowercase, 1 uppercase, 1 special char, min length 8
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  const handleSignUp = async(e)=>{

    e.preventDefault();

    let valid = true

    if(!userName)
    {
      setNameError("Name is Required")
      valid = false
    }else{
      setNameError("")
    }

    if(!email)
    {
      setEmailError("⚠️ Email is Required")
      valid=false;
    }
    else {
      setEmailError("")
    }

    if(!password)
    {
      setPasswordError("⚠️ Password is required")
      valid=false
    }
    else if(!passwordRegex.test(password)){
      setPasswordError(
         "⚠️ Password must be at least 8 chars, include 1 uppercase, 1 lowercase & 1 special char"
      )
      valid=false
    }
    else{
      setPasswordError("")
    }

    if(!valid) return;
   

    try
    {
      let result = await axios.post( serverUrl + '/api/auth/registration',
        {name : userName,email,password},{witgCredewithCredentials: true}
      )
      
      toast.success("Register Successfully !!")
      navigate("/")
      console.log(result.data)
    }
    catch (error) {
      console.log(error)
      toast.error("error")
    }

  }

  const googleSignUp = async()=>{
    
    try {
      const response = await signInWithPopup(auth,provider)
      console.log(response)
      let user = response.user
      let name = user.displayName
      let email = user.email

      const result = await axios.post(serverUrl + "/api/auth/googlelogin",
        {name,email},{withCredentials : true}
      )
      console.log(result.data)
      navigate("/")
    } catch (error) {
      console.log(error)
    }

  }



  return (
    <>
      <div className='w-full h-screen bg-gradient-to-l from-[#141414] to-[#0c2025]
      flex justify-start  items-center flex-col ' >
        <div className='w-[90%] h-[80px] text-white flex justify-start 
        items-center py-4  gap-3  ' >
          <img src={logo} className='w-[40px]' alt="" />
          <h1 className='text-[27px] font-sans ' >One Cart</h1>
        </div>

        {/* Title */}
        <div className='w-full h-[100px] text-white flex flex-col gap-[10px] justify-center 
        items-center ' >
          <span className='font-semibold text-[25px] ' >Login page</span>
          <span className="text-white text-[17px]">
            Welcome to OneCart, Place Your Order
          </span>
        </div>

        {/* Login card */}

        <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] flex justify-center gap-[30px]
        border border-[#96969963] rounded-lg backdrop-blur-2xl shadow-lg ' >

          <form autoComplete='off' onSubmit={handleSignUp}
           className='w-[90%] h-[90%] text-white flex flex-col 
          items-center justify-center gap-[20px] '>

            <div onClick={googleSignUp}
            className=' w-[90%] h-[50px] p-2 bg-[#42656cae] flex items-center justify-center
             rounded-lg text-white  gap-[10px] text-[18px] cursor-pointer ' >
              <img src={google} className='w-[30px]' alt="" />
              Registration With Google
            </div>

            {/* Divider */}
            <div className="w-full h-[20px] flex items-center justify-center gap-[10px]">
              <div className="w-[40%] h-[1px] bg-[#96969635]" />
              OR
              <div className="w-[40%] h-[1px] bg-[#96969635]" />
            </div>

            {/* Inputs */}

            <div className='relative w-[90%] h-[300px] flex flex-col items-center gap-[15px] ' >

              <input 
              type="text"
              value={userName}
              className={`h-[50px] w-full border-2 ${nameError ? "border-red-500" : "border-[#96969635]" } 
               backdrop-blur-lg rounded-lg shadow-lg bg-transparent
               placeholder:text-[#ffffffc7] px-[20px] font-semibold `}
                placeholder='UserName'
                onChange={(e)=>setUserName(e.target.value)}
                autoComplete="new-password"
                required
               />
               {
                nameError && (
                  <p className="text-red-500 text-sm mt-1">{nameError}</p>
                )
               }

              <input 
              type="email"
              value={email}
               className={`h-[50px] w-full border-2 ${emailError ? "border-red-500" : "border-[#96969635]" } 
               backdrop-blur-lg rounded-lg shadow-lg bg-transparent
               placeholder:text-[#ffffffc7] px-[20px] font-semibold `}
               placeholder='Email'
               required
               onChange={(e)=>setEmail(e.target.value)}
               />
               {
                emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )
               }

              <input 
              type={ show ? "text" : "password" }
              value={password}
              className={`h-[50px] w-full border-2 ${passwordError ? "border-red-500" : "border-[#96969635]" } 
               backdrop-blur-lg rounded-lg shadow-lg bg-transparent
               placeholder:text-[#ffffffc7] px-[20px] font-semibold `}
               placeholder='Password'
               autoComplete="new-password"
               required
               onChange={(e)=>setPassword(e.target.value)}
               />

               {
                passwordError && (
                  <p className='mt-1 text-red-500 text-sm' >{passwordError}</p>
                )
               }

               {/* Eye Icons */}

               {
                !show ? (
                  <IoEyeOutline
                  onClick={()=>setShow((prev) => !prev)}
                   className={`w-[20px] h-[20px] cursor-pointer absolute  
                    ${passwordError ? "bottom-[58%] right-[5%]" : "bottom-[45%] right-[5%]" } ` } />
                ) :
                (
                  <IoEyeOffOutline
                  onClick={()=>setShow((prev) => !prev)}
                  className={`w-[20px] h-[90px] cursor-pointer absolute  
                    ${passwordError ? "bottom-[46%] right-[5%]" : "bottom-[33%] right-[5%]" } ` } />
                )

               }

                {/* Button */}
            <button
              type="submit"
              className="w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold cursor-pointer"
            >
              Create Account 
            </button>

            {/* Signup Link */}
            <p className="flex gap-[10px]">
             You Have any Account ?
              <span
                className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Log In
              </span>
            </p>
            </div>
          </form>
        </div>

      </div>
    </>
  )
}
