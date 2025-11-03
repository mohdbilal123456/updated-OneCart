import React, { useContext } from 'react'
import { useState } from 'react'
import logo from '../assets/logo.png'
import google from '../assets/google.png'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import axios from 'axios';
import { dataContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { auth, provider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { userDataContext } from '../context/UserCart';

export default function Login() {
      let [show,setShow] = useState(false)
      let navigate = useNavigate()
      let {serverUrl} = useContext(dataContext)
      let {userData,getCurrentUser} = useContext(userDataContext)

      let [email,setEmail] = useState("")
      let [password,setPassword] = useState("")

      const handleLogin = async (e)=>{
        e.preventDefault()

        try {
          const result = await axios.post(serverUrl + "/api/auth/login",{email,password}
            ,{withCredentials:true}
          )
          await getCurrentUser()
          navigate("/")
          console.log(result)
          toast.success("Login Successfully")
        } 
        catch (error) {
          console.log(error.response.data.message)
          toast.error(error.response.data.message)
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
        await getCurrentUser()
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
      
                <form autoComplete='off' onSubmit={handleLogin}
                 className='w-[90%] h-[90%] text-white flex flex-col 
                items-center justify-center gap-[20px] '>
      
                  <div onClick={googleSignUp}
                   className=' w-[90%] h-[50px] bg-[#42656cae] flex items-center justify-center
                   rounded-lg text-white  gap-[13px] text-[20px] cursor-pointer ' >
                    <img src={google} className='w-[30px]' alt="" />
                    Login With Google
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
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className='h-[50px] w-full border-2 border-[#96969635] backdrop-blur-lg rounded-lg shadow-lg bg-transparent
                     placeholder:text-[#ffffffc7] px-[20px] font-semibold '
                     placeholder='Email'
                     />
                    <input 
                    type={ show ? "text" : "password" }
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className='h-[50px] w-full border-2 border-[#96969635] backdrop-blur-lg rounded-lg shadow-lg bg-transparent
                     placeholder:text-[#ffffffc7] px-[20px] font-semibold '
                     placeholder='Password'
                     autoComplete="new-password"
                     />
      
                     {/* Eye Icons */}
      
                     {
                      !show ? (
                        <IoEyeOutline
                        onClick={()=>setShow((prev) => !prev)}
                         className='w-[20px] h-[20px] cursor-pointer absolute bottom-[67%] right-[5%] ' />
                      ) :
                      (
                        <IoEyeOffOutline
                        onClick={()=>setShow((prev) => !prev)}
                        className='w-[20px] h-[20px] cursor-pointer absolute bottom-[67%] right-[5%] ' />
                      )
      
                     }
      
                      {/* Button */}
                  <button
                    type="submit"
                    className="w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold cursor-pointer"
                  >
                    Login
                  </button>
      
                  {/* Signup Link */}
                  <p className="flex gap-[10px]">
                   You Have any Account ?
                    <span
                      className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer"
                      onClick={() => navigate("/signup")}
                    >
                      Registration
                    </span>
                  </p>
                  </div>
                </form>
              </div>
      
            </div>
    </>
  )
}
