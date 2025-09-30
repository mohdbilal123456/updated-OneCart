import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from "react-router";

function Nav() {
   let navigate = useNavigate()

  return (

   
    <>
      <div className='w-full sticky top-0  ' >
        <div className=' w-[100%]  z-100  px-5 h-[70px] flex items-center justify-between bg-[#D7D6D6]' >
          <div className='flex' >
            <img src={logo} className='w-[35px]' alt="" />
            <h1 className='text-[25px] text-black' >OneCart</h1>
          </div>
          <div>
            <button className='bg-[#2D2C2C] px-[15px] py-[10px] rounded-lg 
            cursor-pointer text-white '
            onClick={()=>navigate("/login")}
            >
              LogOut
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default Nav
