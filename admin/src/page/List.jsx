import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../component/Sidebar'
import Nav from '../component/Nav'
import img from '../assets/img.jpg'
import { RxCross1 } from "react-icons/rx";
import { authDataContext } from '../context/AuthContext';
import axios from 'axios'

function List() {

  let [list,setList] = useState([])
  let {serverUrl} = useContext(authDataContext)

  const fetchList = async()=>{
    try {
      let result = await axios.post(serverUrl + '/api/product/lists')
      setList(result.data)
      console.log('list result' ,result)
    } 
    catch (error) {
      console.log(error)
    }
  }

  const removeList = async(id)=>{
    try {
      let result = await axios.post(`${serverUrl}/api/product/removelist/${id}`,{},{withCredentials:true} )
      console.log(result.data)
      if(result.data)
      {
        fetchList()
      }
      else {
         console.log("Failed to remove Product")
      }
    } 
    catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <>
    <Nav/>
    <div className='w-full min-h-[100vh] pb-8 bg-gradient-to-l 
     from-[#141414] to-[#0c2025]  text-[white]' >
      <Sidebar/>
      <div className='w-[82%] mx-auto flex justify-center  pt-8 ' >
       <p className='md:text-[45px]  text-[24px] ' >All Listed Products</p>
      </div>

      {
        list.length >0 
        ?
        list.map((item,index)=>(
          <div key={index} className=' w-full flex justify-end px-5 mt-5 ' >
          <div className='w-[82%]' >
            <div className=' w-[99%] rounded-lg p-3 h-[120px] bg-[#45556C]
            flex justify-between items-center  ' >
              <div className='flex sm:gap-5 gap-2' >
                <img src={item.image1} alt="" className='w-[75px] h-[90px] rounded-lg ' />
              
                <div className='text-[#BEF0F3] flex flex-col ' >
                    <span>{item.name}</span>
                    <span>{item.category}</span>
                    <span>₹{ item.price}</span>
                </div>
              </div>
              <div>
                <RxCross1 className="w-[23px]  h-[30%] flex items-center justify-center 
                rounded-md md:hover:bg-red-300 md:hover:text-black cursor-pointer"
                onClick={()=>removeList(item._id)} />
              </div>
            </div>
          </div>
        </div>
        ))
      :
      <div className='w-full flex justify-end px-7 mt-5 ' >
        <div className='text-white w-[82%]  md:text-[35px] flex  text-[27px] '>No Product Found</div>
      </div>
      }
    
    </div>
    </>
  )
}

export default List
