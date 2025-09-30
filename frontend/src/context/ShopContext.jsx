import React, { createContext, useContext, useEffect, useState } from 'react'
import { dataContext } from './AuthContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import { userDataContext } from '../context/UserCart'


export const shopDataContext = createContext()

function ShopContext({children}) {

      let [products,setProducts] = useState([])
      let {serverUrl} = useContext(dataContext)
      let {userData,setUserData,getCurrentUserData} = useContext(userDataContext)
      let [search,setSearch] = useState('')
      let [showSearch, setShowSearch] = useState(false)
      let [cartItem,setCartItem] = useState({})
      let [size,setSize] = useState(null)

      let currency = '₹'
      let delivery_fees = 50
      let getProduct = async()=>{

        try 
        {
          let result = await axios.post(serverUrl + '/api/product/lists')
          console.log(result)
          setProducts(result.data)
        }
        catch (error) {
          console.log(error)
        }

      }

      const addToCart = async(itemId,size)=>{
          
        let cartData = structuredClone(cartItem)

        if(!size)
        {
          toast.error("Please Select Product Size")
        }

        if(cartData[itemId])
        {
          if(cartData[itemId][size])
          {
            cartData[itemId][size] +=1
          }
          else
          {
            cartData[itemId][size]=1
          }
        }
        else{
          cartData[itemId] = {}
          cartData[itemId][size]=1
        }

        setCartItem(cartData)

        if(userData){
          try {
            let result =  await axios.post(serverUrl + '/api/cart/add',{itemId,size},
              {withCredentials :true}
            )
            console.log(result.data)
            toast.success("Product Added")
          } 
          catch (error) {
            console.log(error)
            toast.error(error)
          }
        }

      }
      

      const updateQuantity = async(itemId,size,quantity)=>{
        try {
          let cartData = structuredClone(cartItem)
          cartData[itemId][size] = quantity
          setCartItem(cartData)
        } 
        catch (error) {
          console.log(error)
        }

        if(userData)
        {
          try {
            let result = await axios.post(serverUrl + '/api/cart/update',{itemId,size,quantity},
              {withCredentials :true}
            )
            console.log(result.data)
          } 
          catch (error) {
            console.log(error)
          }
        }

      }

      const deleteFromCart = async(itemId,size)=>{
        
        let updatedCart = structuredClone(cartItem)
        if (updatedCart[itemId] && updatedCart[itemId][size]) {
          delete updatedCart[itemId][size];
          if (Object.keys(updatedCart[itemId]).length === 0) delete updatedCart[itemId];
          setCartItem(updatedCart); // UI update
        }
        try {
            await axios.post(serverUrl + "/api/cart/deletecart", { itemId, size }, { withCredentials: true });
          } catch (err) {
            console.log("Delete Error:", err);
          }
      }

      const getUserCart = async()=>{

        try {
          const result = await axios.get(serverUrl + '/api/cart/cart',
            {withCredentials:true}
          )
          setCartItem(result.data)
        } 
        catch (error) {
           console.log(error)
        }
      }

      const getCartCount = ()=>{
        let totalCount = 0
        for(const items in cartItem){
          for(const item in cartItem[items])
            try {
              if(cartItem[items][item]>0)
              {
                totalCount+=cartItem[items][item]
              }
            } catch (error) {
              
            }
        }
        return totalCount
      }

      const getCartAmount = ()=>{

        let totalAmount = 0

        for(const items in cartItem)
        {
          let itemInfo = products.find((product)=>product._id === items)
          console.log("ItemInfo",itemInfo)
          console.log("cartItem",cartItem)

          for(const item in cartItem[items])
          {
            try {
              if(cartItem[items][item]>0)
              {
                totalAmount +=itemInfo.price * cartItem[items][item]
              }
            } 
            catch (error) {
              console.log(error)
            }
          }

        }
        return totalAmount

      }
      
      useEffect(()=>{
        getUserCart()
        getProduct()
      },[])

      let value={
        products,setProducts,search,setSearch,cartItem,setCartItem,getUserCart,
        showSearch,setShowSearch,currency,addToCart,getCartCount,updateQuantity,
        deleteFromCart,size,setSize,getCartAmount,delivery_fees
      }

  return (
    <>
     <shopDataContext.Provider value={value} >
          {children}
     </shopDataContext.Provider>
    </>
  )
}

export default ShopContext