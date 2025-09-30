import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import Card from '../component/Card'
function RelatedProduct({category,subCategory,currentProductId}) {

      let {products} = useContext(shopDataContext)

      let [related,setRelated] = useState([])

      // console.log("All products:", products);
      // console.log("Category from productData:", category);
      // console.log("SubCategory from productData:", subCategory);

      useEffect(()=>{
            if(products.length >0)
            {
                  let productsCopy = [...products]

                  productsCopy = productsCopy.filter((item)=>(
                        item.category === category
                  ))
                  
                  productsCopy = productsCopy.filter((item)=>(
                        item.subCategory === subCategory
                  ))

                  productsCopy = productsCopy.filter((item)=>(
                        item._id !== currentProductId
                  ))

                  setRelated(productsCopy)
            }
      },[products,category])


  return (
    <>
    <div className='w-full py-14  flex justify-center ' >
      <div className='w-[88%]' >
            <Title text1={"RELATED"} text2={"PRODUCTS"} className={"text-center"} />
             <div className='w-[100%] py-10  flex items-center
                  justify-center flex-wrap gap-[50px] ' >
                  {
                        related.length > 0 ? (
                              related.map((item, index) => (
                                    <Card key={index} id={item._id} image={item.image1} 
                                    name={item.name} price={item.price}  />
                              ))
                        ) 
                        : 
                        (
                             <p className="text-white font-semibold text-2xl text-center animate-pulse">
                                    Sorry, no related products available right now 🙁
                              </p>

                        )}
            
            </div>
      </div>
    </div>
    </>

  )
}

export default RelatedProduct
