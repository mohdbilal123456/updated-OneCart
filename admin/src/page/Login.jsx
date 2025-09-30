import React from 'react'
import logo from '../assets/logo.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useState } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios'
import { useContext } from 'react';
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';

function Login() {

      let [show, setShow] = useState(false)

      let [email,setEmail] = useState("")
      let [password,setPassword] = useState("")

      let { serverUrl } = useContext(authDataContext)
      let navigate = useNavigate()

      const adminLogin = async (e)=>{
            e.preventDefault()
            try {
                  const result =await axios.post(serverUrl + '/api/auth/adminlogin',
                  {email,password},{withCredentials:true})
                  console.log(result)
                  navigate("/")
                  toast.success("Login Successfully !!")
                  
            } 
            catch (error) {
                  console.log(error)
                  toast.error(error)
            }
      }



      return (
            <>
                  <div className='w-full  h-screen bg-gradient-to-l from-[#141414] to-[#0c2025]' >
                        <div className='flex p-4 gap-5' >
                              <img src={logo} className='w-[40px] cursor-pointer ' alt="" />
                              <h1 className='text-[22px] font-sans text-white ' >OneCart</h1>
                        </div>
                        <div className='flex  justify-center flex-col items-center xs:mt-10 sm:mt-14 gap-3 ' >
                              <h1 className='text-white font-semibold text-[25px] ' >Login Page</h1>
                              <p className='text-white text-[17px] text-center ' >Welcome to OneCart, Apply to Admin Login</p>
                        </div>
                        <div className='relative w-[90%] max-w-[600px] h-[400px] border border-slate-400
                        flex mx-auto gap-6 items-center justify-center flex-col   py-3 rounded-lg bg-[#0F1618] mt-10 sm:mt-6 ' >
                        <form onSubmit={adminLogin} 
                        className='flex justify-center flex-col gap-5 items-center
                        w-full h-full max-w-full '>
                              <input type="email" required
                                    onChange={(e)=>setEmail(e.target.value)}
                                    value={email}
                                    placeholder='Enter Email'
                                    className='max-w-[400px] w-[90%] h-[50px] text-white rounded-md p-2 placeholder:text-gray-200 border 
                                          border-slate-400' />
                              <input type={show ? "text" : "password"} required
                                    onChange={(e)=>setPassword(e.target.value)}
                                    value={password}
                                    placeholder='Enter Password'
                                    className='max-w-[400px] w-[90%] text-white rounded-md p-2 placeholder:text-gray-200 border 
                                    border-slate-400' />
                              {
                                    !show && (
                                          <IoEyeOutline className='text-white w-[20px] h-[20px] 
                                          absolute bottom-[47%] right-[20%] '
                                                onClick={() => setShow(prev => !prev)}
                                          />
                                    )

                              }
                              {
                                    show && (
                                          <IoEye className='text-white w-[20px] h-[20px] 
                                          absolute bottom-[47%] right-[20%]'
                                          onClick={() => setShow(prev => !prev)} />
                                    )
                              }


                              <button className='max-w-[400px] w-[90%] h-[50px] rounded-2xl cursor-pointer
                                    text-white font-semibold text-2xl bg-blue-300 hover:opacity-90' >
                                    Login
                              </button>

                        </form>
                        </div>


                  </div>
            </>

      )
}

export default Login
