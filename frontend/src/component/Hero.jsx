import React from 'react'
import { FaCircle } from "react-icons/fa6";

function Hero({ heroCount, setHeroCount, heroData }) {
  return (
    <div className="relative ">
      <div
        className="w-[40%]  absolute  z-10  lg:left-[5%] xs:left-[2%] lg:top-[80px] md:top-[20px] sm:top-[60px]
          xs:top-[10px] text-[#88d9ee] xs:text-[19px] sm:text-[28px] md:text-[40px] lg:text-[55px]
          flex flex-col ">
        <p className="font-bold">{heroData.text}</p>
        <p className="font-bold">{heroData.text2}</p>
      </div>

      <div className='absolute h-[100%] lg:top-[500px] md:top-[330px] xs:top-[155px] sm:top-[220px]  left-[10%] flex gap-2 ' >
        {
          [0,1,2,3].map((i)=>(
            <FaCircle key={i}
            onClick={()=>setHeroCount(i)} 
            className={`w-3 h-3 cursor-pointer ${heroCount===i ? "text-orange-400" :"text-white"} `} />
          ))
        }
      </div>

     </div>
  )
}
export default Hero
