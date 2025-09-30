import React, { useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import upload from '../assets/uploadimage.jpg'
import { useContext } from 'react'
import {authDataContext} from '../context/AuthContext'
import axios from 'axios'
import Loading from '../component/Loading'
import {toast} from 'react-toastify'
function Add() {

  let [image1, setImage1] = useState(false)
  let [image2, setImage2] = useState(false)
  let [image3, setImage3] = useState(false)
  let [image4, setImage4] = useState(false)
  let [name,setName]=useState("")
  let [category,setCategory]=useState("men")
  let [subCategory,setSubCategory]=useState("winterwear")
  let [description,setDescription]=useState("")
  let [price,setPrice] = useState("")
  let [bestseller,setBestSeller] = useState(false)
  let [sizes,setSizes] = useState([])
  let [loading,setLoading] = useState(false)

  let {serverUrl} = useContext(authDataContext)

  const handleAddProduct = async(e)=>{

    e.preventDefault()
    setLoading(true)

    try {

      let form = new FormData()
      form.append("name",name)
      form.append("category",category)
      form.append("price",price)
      form.append("subCategory",subCategory)
      form.append("sizes",JSON.stringify(sizes))
      form.append("bestseller",bestseller)
      form.append("description",description)
      form.append("image1",image1)
      form.append("image2",image2)
      form.append("image3",image3)
      form.append("image4",image4)

      let result = await axios.post(serverUrl + "/api/product/addproduct",
        form ,{withCredentials:true}
      ) 

      console.log(result.data)
      toast.success("Add Product Successfully !!")
      setLoading(false)

      if(result.data)
      {
        setName("")
        setDescription("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice("")
        setSizes([])
        setBestSeller(false)
        setCategory("men")
        setSubCategory("winterwear")
      }

    } 
    catch (error) {
      console.log(error)
    }

  }

  return (

    <>
      <Nav />
      <div className='w-full min-h-[100vh] pb-8 bg-gradient-to-l 
     from-[#141414] to-[#0c2025]  text-[white] flex justify-end ' >

        <Sidebar />

        <div className='w-[82%] h-[100%]  
      flex justify-center sm:mt-6 mt-0 '>
          <form action="" onSubmit={handleAddProduct}
            className='w-[100%] h-[100%] flex flex-col gap-6 justify-start
         overflow-x-hidden px-9 '
          >
            <div className='w-[400px] h-[60px] text-[25px] md:text-[40px] ' >
              Add Product Page
            </div>

            <div className='w-[80%] h-[30px]  '>
              <p className='text-[20px] md:text-[25px] font-semibold ' >Upload Image </p>
            </div>

            <div className='w-[100%] h-[100%] flex gap-3 ' >
              <label htmlFor="image1">
                <img src={!image1 ? upload : URL.createObjectURL(image1)} alt="" 
                className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] hover:border-[#46d1f7]  cursor-pointer rounded-lg ' />
                <input type="file" hidden id='image1' 
                onChange={(e) => setImage1(e.target.files[0])} />
              </label>
              <label htmlFor="image2">
                <img src={!image2 ? upload : URL.createObjectURL(image2)} alt="" 
                className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] hover:border-[#46d1f7]  cursor-pointer rounded-lg ' />
                <input type="file" hidden id='image2' 
                onChange={(e) => setImage2(e.target.files[0])} />
              </label>
              <label htmlFor="image3">
                <img src={!image3 ? upload : URL.createObjectURL(image3)} alt="" 
                className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] hover:border-[#46d1f7]  cursor-pointer rounded-lg ' />
                <input type="file" hidden id='image3' 
                onChange={(e) => setImage3(e.target.files[0])} /> 
              </label>
              <label htmlFor="image4">
                <img src={!image4 ? upload : URL.createObjectURL(image4)} alt="" 
                className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] hover:border-[#46d1f7]  cursor-pointer rounded-lg ' />
                <input type="file" hidden id='image4' 
                 onChange={(e) => setImage4(e.target.files[0])} />       
              </label>
            </div>


            <div className='w-[80%] h-[100px] flex items-start justify-center flex-col  gap-[10px]'>
              <p className='text-[20px] md:text-[25px]  font-semibold'>
                Product Name
              </p>
              <input type="text" placeholder='Type here'
                className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]' 
                onChange={(e)=>setName(e.target.value)} value={name}
                required />
            </div>

            <div className='w-[80%] flex flex-col gap-3  ' >
                <p className='text-[20px] md:text-[25px] font-semibold ' >Product Description</p>
                <textarea name="" placeholder='Type Here'
                onChange={(e)=>setDescription(e.target.value)} value={description}
                className='w-[600px] max-w-[98%] h-[80px] rounded-lg border-[2px] cursor-pointer
                hover:border-[#46d1f7] py-2 bg-slate-600 px-[20px]  text-[18px] placeholder:text-[#ffffffc2] '>

                </textarea>
            </div>

            <div className='w-[80%] flex items-center flex-wrap gap-[10px] ' >
              <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col  gap-[10px] ' >
                <p className='text-[20px] md:text-[25px] font-semibold ' >Product Category</p>
                <select className='bg-slate-600 w-[60%] outline-0 px-[10px] py-[7px] rounded-lg
                 hover:border-[#46d1f7] border-white border-[2px]'
                 onChange={(e)=>setCategory(e.target.value)} >
                  <option value="men">MEN</option>
                  <option value="women">WOMAN</option>
                  <option value="kids">KIDS</option>
                </select>
              </div>
              <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col  gap-[10px] ' >
                <p className='text-[20px] md:text-[25px] font-semibold ' >Sub Category</p>
                <select className='bg-slate-600 w-[60%] outline-0 px-[10px] py-[7px] rounded-lg
                 hover:border-[#46d1f7] border-white border-[2px]'
                 onChange={(e)=>setSubCategory(e.target.value)} >
                  <option value="winterwear">Winter Wear</option>
                  <option value="topwear">Top Wear</option>
                  <option value="bottomwear">Bottom Wear</option>
                </select>
              </div>
            </div>


            <div className='w-[80%] h-[100px] flex items-start justify-center flex-col  gap-[10px]'>
              <p className='text-[20px] md:text-[25px]  font-semibold' onClick={(e)=>setPrice(e.target.value)} required >
                Product Price
              </p>
              <input type="number" placeholder='₹ 2000'
                className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]' 
                value={price} onChange={(e)=>setPrice(e.target.value)}
                name='price'
                required />
            </div>


            <div className='w-[80%] h-[100px] flex items-start justify-center flex-col  gap-[10px]'>
              <p className='text-[20px] md:text-[25px]  font-semibold'>
                Product Size
              </p>

              <div className='flex  gap-5' >
                <div className={`bg-slate-600 px-[20px] py-[7px] font-semibold text-[18px] rounded-lg cursor-pointer border-2 border-white
                 ${sizes.includes("S") ? "bg-green-500 text-black border-[#46d1f7]" : ""} hover:border-[#46d1f7]`}
                 onClick={()=>setSizes(prev=>prev.includes("S") ? prev.filter(item => item!== "S" ) :[...prev,"S"] ) }
                 >
                S
              </div>
              <div className={`bg-slate-600 px-[20px] py-[7px] font-semibold text-[18px] rounded-lg cursor-pointer border-2 border-white
                 ${sizes.includes("M") ? "bg-green-500 text-black border-[#46d1f7]" : ""} hover:border-[#46d1f7]`}
                 onClick={()=>setSizes(prev=>prev.includes("M") ? prev.filter(item => item!== "M" ) :[...prev,"M"] ) }
                 >
                M
              </div>
             <div className={`bg-slate-600 px-[20px] py-[7px] font-semibold text-[18px] rounded-lg cursor-pointer border-2 border-white
                 ${sizes.includes("L") ? "bg-green-500 text-black border-[#46d1f7]" : ""} hover:border-[#46d1f7]`}
                 onClick={()=>setSizes(prev=>prev.includes("L") ? prev.filter(item => item!== "L" ) :[...prev,"L"] ) }
                 >
                L
              </div>
             <div className={`bg-slate-600 px-[20px] py-[7px] font-semibold text-[18px] rounded-lg cursor-pointer border-2 border-white
                 ${sizes.includes("XL") ? "bg-green-500 text-black border-[#46d1f7]" : ""} hover:border-[#46d1f7]`}
                 onClick={()=>setSizes(prev=>prev.includes("XL") ? prev.filter(item => item!== "XL" ) :[...prev,"XL"] ) }
                 >
                XL
              </div>
              <div className={`bg-slate-600 px-[20px] py-[7px] font-semibold text-[18px] rounded-lg cursor-pointer border-2 border-white
                 ${sizes.includes("XXL") ? "bg-green-500 text-black border-[#46d1f7]" : ""} hover:border-[#46d1f7]`}
                 onClick={()=>setSizes(prev=>prev.includes("XXL") ? prev.filter(item => item!== "XXL" ) :[...prev,"XXL"] ) }
                 >
               XXL
              </div>
              
              </div>
            </div>

            <div className='w-[80%] flex items-center gap-3 ' >
              <input type="checkbox" id='checkbox' className='w-[25px] h-[25px] cursor-pointer '
              onChange={()=>setBestSeller(prev => !prev)} />
              <label htmlFor="checkbox" className='text-[18px] md:text-[22px]  font-semibold'>
                Add to BestSeller
              </label>
            </div>

            <button className='w-[140px] px-[20px] py-[20px] rounded-xl bg-[#65d8f7] flex items-center justify-center gap-[10px] text-black
             active:bg-slate-700 active:text-white active:border-[2px] font-semibold border-white cursor-pointer '>
                {loading ? <Loading/> : "Add Product" }
            </button>

          </form>

        </div>
      </div>
    </>
  )
}

export default Add
