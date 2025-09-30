import React from 'react'
import { useNavigate } from 'react-router-dom';
function Card({id,image,name,price}) {

  let navigate = useNavigate()
  

  return (
    <>
      <div className='max-w-[300px] w-[90%] p-3 flex flex-col items-center rounded-lg bg-[#17282C] 
      py-4 h-[440px] border border-white hover:scale-105  cursor-pointer gap-3 '
      onClick={()=>navigate(`/productdetails/${id}`)} >
            <img src={image} className='w-[240px] h-[300px] rounded-lg ' alt="" />
            <span className='text-2xl text-cyan-400 font-[500] ' >{name}</span>
            <span className='text-2xl text-cyan-400 font-[500] ' >₹ {price}</span>
      </div>
      
    </>
  )
}

export default Card
