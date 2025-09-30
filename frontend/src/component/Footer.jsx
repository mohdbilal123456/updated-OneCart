import React from 'react'
import logo from '../assets/logo.png'
function Footer() {
  return (
    <>
     <div className='w-full flex  items-center justify-center bg-[#DEFCFC] md:py-5 xs:py-20 ' >
            <div className='w-[80%] mt-4  flex gap-4 md:justify-between md:flex-row flex-col   xs:items-center' >
                  <div className='w-[25%] flex gap-3 flex-col items-center justify-center ' >
                        <img src={logo} className='w-[26px] h-[26px]
                        md:w-[36px] md:h-[36px]' alt="" />
                        <p className='text-center' >
                              OneCart is your all-in-one online shopping 
                              destination, offering top-quality products,
                              unbeatable deals, and fast delivery—all 
                              backed by trusted service designed to make
                              your life easier every day.
                        </p>
                  </div>
                  <div className='w-[25%] flex justify-center flex-col items-center' >
                        <p className='text-[25px]' >COMPANY</p>
                        <ul className='cursor-pointer text-center'>
                              <li>Home</li>
                              <li>About Us</li>
                              <li>Delivery</li>
                              <li>Privacy Policy</li>
                        </ul>
                  </div>
                  <div className='w-[25%] flex justify-center flex-col items-center'>
                        <p className='text-[25px] text-center'>GET IN TOUCH</p>
                        <ul className='text-center' >
                              <li>+91-9876543210</li>
                              <li>contact@onecart.com</li>
                              <li>+1-123-456-7890</li>
                              <li>admin@onecart.com</li>
                        </ul>
                  </div>
            </div>
            
     </div>
     <div className='w-full flex items-center justify-center pb-1  bg-[#DEFCFC] border-gray-400 border-t-[1px] ' >
            <p className='text-center' >Copyright 2025@onecart.com-All Rights Reserved</p>
      </div>
      
    </>
  )
}

export default Footer
