import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'

export default function CartTotal() {
      
      const {currency , delivery_fees , getCartAmount} = useContext(shopDataContext)


      return (
      <>
      <div className='w-full flex justify-center ' >

      { 
            <div className="w-[80%] md:w-[40%] bg-[#253536] rounded-2xl shadow-lg mt-6 p-6 text-white flex flex-col gap-4">
            <h2 className="text-xl font-bold border-b border-gray-600 pb-2">Cart Totals</h2>
            
            <div className="flex justify-between text-lg">
                  <span>Subtotal</span>
                  <span>{currency}{getCartAmount()}</span>
            </div>

            <div className="flex justify-between text-lg">
                  <span>Shipping</span>
                  <span>₹50</span>
            </div>

            <div className="flex justify-between text-lg font-bold border-t border-gray-600 pt-2">
                  <span>Total</span>
                  <span>{getCartAmount()===0 ? 0 : getCartAmount()+delivery_fees}</span>
            </div>

            
            
            </div>
      }
            </div>
      
    </>
  )
}
