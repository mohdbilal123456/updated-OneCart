import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
// import img from '../assets/shirtman4.jpg'
import { shopDataContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import ReviewDescriptionBox from '../component/ReviewDescriptionBox';
import RelatedProduct from '../component/RelatedProduct';

function ProductDetails() {

      let {products,currency,addToCart,size,setSize} = useContext(shopDataContext)
      let [images,setImages] = useState(null)
      let [productData,setProductData] = useState(false)
      let {productId} = useParams()

      // console.log('size',size)
      
     

      const fetchData = ()=>{
            products.forEach((item)=>{
                  if(item._id === productId)
                  {
                        setProductData(item)
                        setImages(item.image1)
                  }
            })
      }
      // console.log('p',productData)

      useEffect(()=>{
            fetchData()
      },[products,productId])
      

  return (
    <>
    
    <div className='w-full  min-h-[100vh] bg-gradient-to-l from-[#141414]
     to-[#0c2025] flex flex-col  ' >

     {/*  */}
      <div className='flex  lg:flex-row lg:items-start items-center
      flex-col lg:justify-start' >
             {/* Images */}
            <div className='lg:w-[40%] w-[80%]
        pt-[110px] px-4 ' >
            {/* left Images */}
            
            <div className='w-full flex justify-center
            lg:items-center gap-8 lg:flex-row flex-col-reverse    border-white ' >
                  <div className='flex lg:flex-col flex-row justify-center gap-4'>
                  {
                        [productData?.image1,productData?.image2,
                        productData?.image3,productData?.image4]?.map((img,i)=>(
                              <div key={i} className='w-[100px] cursor-pointer hover:scale-105
                              hover:border-purple-300 hover:border-2  h-[120px] rounded-lg ' >
                                    <img src={img} className='h-full w-full rounded-lg '
                              alt="" onMouseEnter={()=>setImages(img)}
                              onClick={()=>setImages(img)} />
                              </div>
                        ))
                  }

                  </div>
                  {/* Right Image */}

                  <div className='lg:max-w-[500px] rounded-lg w-full h-[600px] ' >
                        <img src={images} className='w-full h-full rounded-lg  '
                         alt="" />
                  </div>
            </div>
      </div>


      {/* Image Details */}

      <div className='w-[50%] text-white h-full mt-[60px] 
      lg:mt-[110px]  ' >

            <div className='flex lg:pl-6  flex-col gap-3 ' >
                  <p className=' font-bold md:text-[40px] text-[28px] ' >
                        {productData.name}
                  </p>
                  <ul className='flex gap-1 ' >
                        <li><FaStar className='text-yellow-400' /></li>
                        <li><FaStar className='text-yellow-400' /></li>
                        <li><FaStar className='text-yellow-400' /></li>
                        <li><FaStar className='text-yellow-400' /></li>
                        <li><FaStarHalfStroke className='text-yellow-400' /></li>
                  </ul>
                  <p className=' font-bold text-[26px] md:text-[35px] ' >
                        {currency} {productData.price}
                  </p>
                  <p className='font-bold text-[20px] ' >
                        Designed for all-day comfort and effortless style, 
                        this apparel combines premium-quality fabric with a
                        modern fit. Breathable, lightweight, and versatile
                        — perfect for casual outings, daily wear, or 
                        special occasions. Easy to pair and made to last,
                        it brings together comfort and fashion in one
                        timeless piece
                  </p>
                  <p className='font-bold text-[23px] md:text-[35px] ' >Select Size</p>

                  <div className='flex text-black text-[18px] gap-5 ' >
                        {
                              productData?.sizes?.map((item,i)=>(
                                    <button key={i} 
                                    onClick={()=>setSize(item)}
                                    className={`px-4 py-2 cursor-pointer bg-[#CAD5E2] 
                                    ${item ===size ? 'bg-black font-semibold text-blue-400 text-lg':
                                          'bg-slate-300 text-black'
                                     } rounded-lg`}
                                     >
                                          {item}
                                    </button>
                              ))
                        }
                        
                  </div>

                  <div className='py-2' >
                        <button className='bg-[#495b61c9] text-white py-2 px-4 rounded-xl 
                        border border-gray-500 shadow-md cursor-pointer
                         hover:bg-[#5c6f75] transition'
                        onClick={()=>addToCart(productData._id,size)} >
                              Add To Cart
                        </button>
                  </div>
                  {/* Line  */}
                  <div className='h-[1px] bg-gray-400 ' ></div>

                  <div className='flex gap-2 flex-col  ' >
                        <p>100% Original Product.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>East return and exchange policy within 7 days.</p>
                  </div>
            </div>

            </div>
      </div>
      {/* ReviewBox */}
      <div>
            <ReviewDescriptionBox/>
            <RelatedProduct category={productData.category}
            subCategory={productData.subCategory} currentProductId={productData._id} />

      </div>
     
    </div>
     
     
    </>
  )
}

export default ProductDetails
