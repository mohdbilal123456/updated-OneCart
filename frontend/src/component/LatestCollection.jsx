import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'

import { shopDataContext } from '../context/ShopContext'
import Card from './Card'
function LatestCollection() {

      let [latestProducts,setLatestProducts] = useState([])
      let {products} = useContext(shopDataContext)

      useEffect(()=>{
            setLatestProducts(products.slice(0,8))
      },[products])

  return (
    <>
    <div className='w-[100%] pt-12 min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025]'>
      
      
      <Title text1={"LATEST"} text2={"COLLECTIONS"} className={"text-center"} />
      
      <p className='pt-4 px-3 text-white font-semibold text-center'>
            Step Into Style – New Collection Dropping This Season!
      </p>

     <div className='w-full mt-10 flex justify-center ' >
       <div className='w-[80%] sm:py-7 py-6 pb-4  grid gap-8
      lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 justify-items-center  ' >
            {
                  latestProducts.length>0
                  ?
                  (
                        latestProducts?.map((item,index)=>(
                              <Card key={index} id={item._id} image={item.image1} name={item.name} price={item.price} />
                        ))
                  )
                  :
                  ""
            }
            
      </div>

     </div>

    </div>
    </>
  )
}

export default LatestCollection
