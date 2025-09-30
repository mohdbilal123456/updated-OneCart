import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'
function BestSeller() {

  let [bestSeller,setBestSeller] = useState([])
  let {products} = useContext(shopDataContext)
  // console.log("product",products)

  useEffect(()=>{
    let filterProduct = products.filter((item)=>item.bestseller)
    setBestSeller(filterProduct.slice(0,4))
  },[products])

  return (
    <>

    <div className='w-[100%]  pt-12 min-h-[75vh] bg-gradient-to-l
     from-[#141414] to-[#0c2025]'>
      <Title text1={"BEST"} text2={"SELLER"} className={"text-center"} />

      <p className='pt-4 px-3 text-white font-semibold text-center'>
          Tried, Tested, Loved – Discover Our All-Time Best Sellers.
      </p>

      <div className='w-full mt-10 flex justify-center ' >

        <div className='w-[80%]    grid gap-8
      lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 justify-items-center  '>
           {
            bestSeller.length>0
            ?
            bestSeller.map((item,index)=>(
              // <div key={index} className='max-w-[300px] w-[90%] p-3 flex flex-col items-center rounded-lg bg-[#17282C] 
              //   py-4 h-[440px] border border-white hover:scale-105  cursor-pointer gap-3 '>
              //     <img src={item.image1} className='w-[240px] h-[300px] rounded-lg ' alt="" />
              //     <span className='text-2xl text-cyan-400 font-[500] ' >{item.name}</span>
              //     <span className='text-2xl text-cyan-400 font-[500] ' >₹ {item.price}</span>
              // </div>
               <Card key={index} id={item._id} image={item.image1} name={item.name} price={item.price} />
            ))
            :
            "NO Product"
           }
        </div>

      </div>

    </div>
    </>
  )
}

export default BestSeller
