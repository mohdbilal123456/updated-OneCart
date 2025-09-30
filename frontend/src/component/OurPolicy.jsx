import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <>
    <div className='w-[100%] pt-6  min-h-[50vh] flex flex-col items-center bg-gradient-to-l
     from-[#141414] to-[#0c2025]'>
      <Title text1={"OUR"} text2={'POLICY'}/>

       <p className='pt-4 px-3 text-white font-semibold text-center'>
         Customer-Friendly Policies – Committed to Your Satisfaction and Safety.
      </p>

      <div className='w-[80%] mt-12 ' >
            <div className='grid lg:grid-cols-3 gap-5  ' >
                  <div className='flex  flex-col gap-3 items-center justify-center ' >
                        <RiExchangeFundsLine
                        className='text-[#90b9ff] w-12 h-12 md:w-16 md:h-16' />
                        <p className='text-[#a5e8f7] font-semibold text-lg md:text-xl lg:text-2xl'>Easy Exchange Policy</p>
                        <p className='text-[aliceblue] font-semibold text-sm md:text-base text-center lg:text-lg'>
                              Exchange Made Easy - Quick, Simple, and Customer-Friendly Process.
                        </p>
                  </div>
                  <div className='flex  flex-col items-center justify-center ' >
                        <TbRosetteDiscountCheckFilled 
                        className='text-[#90b9ff] w-12 h-12 md:w-16 md:h-16' />
                        <p className='text-[#a5e8f7] font-semibold text-lg md:text-xl lg:text-2xl'>7 Day Return Policy</p>
                        <p className='text-[aliceblue] font-semibold text-sm text-center md:text-base lg:text-lg'>
                              Shop with Confidence - 7 Days Easy Return Guarantee.
                        </p>
                  </div>
                  <div className='flex  flex-col items-center justify-center ' >
                        <BiSupport
                        className='text-[#90b9ff] w-12 h-12 md:w-16 md:h-16' />
                        <p className='text-[#a5e8f7] font-semibold text-lg md:text-xl lg:text-2xl'>Best Customer Support</p>
                        <p className='text-[aliceblue] font-semibold text-sm md:text-base text-center lg:text-lg'>
                              Trusted Customer Support – Your Satisfaction Is Our Priority.
                        </p>
                  </div>
                  
            </div>
      </div>

    </div>
      
    </>
  )
}

export default OurPolicy
