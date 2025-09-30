import React, { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa"; // npm install react-icons
// import img from "../assets/shirtman4.jpg";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from 'react-router-dom'
import CartTotal from "./CartTotal";
import Title from '../component/Title'
function Cart() {

  const { products, currency, cartItem ,updateQuantity,deleteFromCart,size,setSize } = useContext(shopDataContext)
  let [cartData,setCartData] = useState([])
  // console.log(products)
  

  let navigate = useNavigate()
  // console.log('cartData',cartData)

  useEffect(()=>{
    const tempData = []
    for(const items in cartItem)
    {
      for(const item in cartItem[items])
      {
        if(cartItem[items][item]>0)
        {
          tempData.push({
            _id: items,
            size : item,
            quantity : cartItem[items][item]
          })
        }
      }
    }
    setCartData(tempData)
  },[cartItem])

  // items -> product id
  // item -> Size of product
  // cartItem[items][item] ->Quantity of that product & size

//   console.log("products:", products);
// console.log("cartItem:", cartItem);
// console.log("cartData:", cartData);
  

  return (
    <>
      <div className="w-full min-h-[calc(100vh-70px)] bg-gradient-to-l from-[#141414]
       to-[#0c2025] flex flex-col items-center px-5 pt-2 pb-22 md:pb-0 ">
        
        {/* Cart Item */}
        <Title text1={"MY"} text2={"CARTS"} />
        {
        cartData.map((item,index)=>{
        const productData = products.find((product)=>product._id === item._id)
    // console.log('pro',productData)

    return(
      <div key={index} className="w-full md:w-[85%] flex flex-col md:flex-row items-center 
      justify-between mt-8 p-4 rounded-2xl bg-[#253536] shadow-lg gap-6">
        
        {/* Product Image */}
        <div className="w-[120px] h-[120px] flex-shrink-0">
          <img
            src={productData?.image1}
            className="w-full h-full object-contain rounded-[20px]"
            alt="Product"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col items-center md:items-start text-white text-lg font-semibold flex-1">
          <span className="text-[22px]">{productData?.name}</span>
          <span className="text-[#46d1f7] text-[20px]">{currency} {productData.price}</span>
          <span>Size :{item.size}</span>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-center gap-3 flex-1">
          <button className="w-10 h-10 flex items-center justify-center rounded-full
           bg-[#46d1f7] text-black font-bold text-xl hover:scale-105 transition"
           onClick={()=>updateQuantity(item._id,item.size,item.quantity+1)} >
            +
          </button>
          <span className="text-white font-bold text-lg">{item.quantity}</span>
            <button
              className={`w-10 h-10 flex items-center justify-center rounded-full
                          font-bold text-xl transition 
                          ${item.quantity === 1 
                            ? "bg-gray-400 text-gray-200 cursor-not-allowed" 
                            : "bg-red-500 text-white hover:scale-105"}`}
              disabled={item.quantity === 1}
              onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
            >
              -
            </button>
        </div>

        {/* Delete Button */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full 
                    bg-gray-700 text-red-400 hover:bg-red-500 hover:text-white transition"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this item?")) {
              deleteFromCart(item._id, item.size);
            }
          }}
        >
          <FaTrash size={18} />
        </button>

      </div>
    )
  })
}


    {/* Cart Total Box */}
    
    <CartTotal/>
    <button className="mt-4 w-[32%] py-3 px-1 cursor-pointer rounded-xl bg-[#46d1f7] text-black 
            font-semibold text-lg hover:scale-120 transition shadow-md" 
            onClick={()=>{
              if(cartData.length==0)
              {
                alert("Select Product first!");
                return;
              }
              navigate('/placeorder')}} >
                  Proceed to Checkout
    </button>

    </div>
    </>
  );
}

export default Cart;
