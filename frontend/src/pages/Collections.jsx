import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Card from '../component/Card'
import Loading from '../component/Loading';
import { useNavigate } from 'react-router-dom';

function Collections() {

  let {products,search,showSearch} = useContext(shopDataContext)
  let [filterProduct,setFilterProduct] = useState([])
  let [originalData,setOriginalData] = useState([])
  let [showFilter,setShowFilter] = useState(false)
  let [category,setCategory] = useState([])
  let [subCategory,setSubCategory] = useState([])
  const [loading, setLoading] = useState(true);
 
  let navigate = useNavigate()

  const toggleCategory = (e)=>{
    let value = e.target.value
   
    if(category.includes(value))
    {
      setCategory(prev => prev.filter(item => item !== value))
    }
    else{
      setCategory(prev => [...prev,value])
    }
  }

  const toggleSubCategory = (e)=>{
    
    let value = e.target.value

    if(subCategory.includes(value))
    {
      setSubCategory(prev=>prev.filter(item =>item !==value))
    }
    else {
      setSubCategory(prev => [...prev,value])
    }
    
  }

  

  const applyFilter = ()=>{
    let productCopy = [...originalData]

    if(showSearch && search)
    {
      
      productCopy = productCopy.filter(
        item => item.name.toLowerCase().includes(search.toLowerCase())
      )
    }


    if(category.length>0)
    {
      productCopy = productCopy.filter(item=>category.includes(item.category.toLowerCase()))
      
    }
    if(subCategory.length>0)
    {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory.toLowerCase()))
    }
    setFilterProduct(productCopy)
  }



  const sortType=(e)=>{
    let value = e.target.value
    let sortedData = [...filterProduct]
   
    if(value==='low-high'){
       sortedData.sort((a,b)=>a.price - b.price)
       setFilterProduct(sortedData)
    } 
    else if(value === 'high-low')
    {
      sortedData.sort((a,b)=> b.price - a.price)
      setFilterProduct(sortedData)
    }
    else{
      applyFilter()
    }
    
  }

  useEffect(()=>{
    if(products && products.length>0)
      {
        setOriginalData(products)
        setFilterProduct(products)
        setLoading(false)
      }
    },[products])

  useEffect(() => {
    if (!loading) applyFilter();
  }, [category, subCategory,search,showSearch, loading]);


  

  return (

    <>

    <div className='w-full  min-h-[100vh] bg-gradient-to-l 
        from-[#141414] to-[#0c2025] flex items-start flex-col
        md:flex-row justify-center overflow-x-hidden z-[2] pb-[100px]' >
          <div className={` md:w-[30vw] lg:w-[20vw] w-[100vw] md:h-screen
          p-[20px] border-r-[1px] border-gray-400 
          text-[#aaf5fa] md:fixed left-0 overflow-y-auto top-15 `} >
    
          <p className='text-[25px] font-semibold flex gap-[5px] 
          items-center justify-start '>
            FILTERS
            {showFilter && <FaChevronRight className='text-[18px] md:hidden '
            onClick={()=>setShowFilter(prev => !prev)} />}
            {!showFilter && <FaChevronDown className='text-[18px] md:hidden '
            onClick={()=>setShowFilter(prev => !prev)} />}
          </p>

            <div className={`border-[2px] border-[#dedcdc] pl-2 py-3
            mt-6 rounded-md bg-slate-600 ${!showFilter ? '' : "hidden"} `}  >
            <p className=' text-[18px] text-[#f8fafaf] ' >
              CATEGORIES
            </p>
    
            <div className='w-[230px] h-[120px] flex items-start justify-center
            gap-[6px] flex-col '>
              <p className='flex items-center justify-center
              gap-[10px] text-[17px] font-light '>
                <input type="checkbox" value={'men'} className='  w-6 cursor-pointer '
                onChange={toggleCategory} />
                MEN
                </p>
              <p className='flex items-center justify-center
              gap-[10px] text-[17px] font-light '>
                <input type="checkbox" value={'women'} className='  w-6 cursor-pointer'
                onChange={toggleCategory}/>
                WOMAN
                </p>
              <p className='flex items-center justify-center
              gap-[10px] text-[17px] font-light '>
                <input type="checkbox" value={'kids'} className=' w-6 cursor-pointer '
              onChange={toggleCategory}/>
                KIDS
                </p>
            </div>
    
          </div>
          
          
            
          <div className={`border-[2px] border-[#dedcdc] pl-2 py-3
          mt-6 rounded-md bg-slate-600 ${!showFilter ? '' : "hidden"} `} >
            <p>
              SUB CATEGORIES
            </p>
    
            <div className='w-[230px] h-[120px] flex items-start justify-center
            gap-[10px] flex-col '>
              <p className='flex items-center justify-center
              gap-[10px] text-[17px] font-light '>
                <input type="checkbox" value={'topwear'} className='  w-6 cursor-pointer '
                onChange={toggleSubCategory} />
                  TOP WEAR
                </p>
              <p className='flex items-center justify-center
              gap-[10px] text-[17px] font-light '>
                <input type="checkbox" value={'bottomwear'} className='  w-6 cursor-pointer'
                onChange={toggleSubCategory} />
                BOTTOM WEAR
                </p>
              <p className='flex items-center justify-center
              gap-[10px] text-[17px] font-light '>
                <input type="checkbox" value={'winterwear'} className=' w-6 cursor-pointer '
                onChange={toggleSubCategory} />
                WINTER WEAR
                </p>
            </div>
    
          </div>
          
          </div>
    
          <div className='lg:ml-[20vw] md:ml-[30vw] md:py-[10px] ' >
            <div className='md:w-[80vw] w-[100vw] border-amber-400
            p-[20px] flex md:justify-center   flex-col gap-4 lg:flex-row '>
               <div className='w-[90%] md:pl-[10%] lg:pl-[2%]  flex justify-between items-center flex-wrap gap-4' >
                <Title text1={"ALL"} text2={"COLLECTIONS"} />
                   
                <select onChange={sortType}
                  className='bg-slate-600 w-[60%] md:w-[200px] h-[50px]
                  px-[10px] text-white rounded-lg hover:border-[#46d1f7] 
                  border-[2px] cursor-pointer '>
                    <option value="relevant"
                      className='w-[100%] h-[100%]'
                    >
                        Sort By Relevant 
                    </option>
                    <option value="low-high"
                     
                      className='w-[100%] h-[100%]' >Low to High
                    </option>
                    <option value="high-low"
                   
                    className='w-[100%] h-[100%]'>
                      High to Low 
                    </option>
                </select>
               </div>
            
            </div>
    
            <div className='lg:w-[80vw] md:w-[60vw] w-[100vw] min-h-[70vh]
            flex  items-center justify-center flex-wrap gap-[30px]  ' >
              {
                loading
                ?
                (
                  <p className="text-gray-300 text-lg font-medium bg-slate-700 px-6 py-4 rounded-lg shadow-md">
                    Oops! We couldn’t find anything for you. Explore other categories and keep shopping!
                  </p>
                )
                :
                filterProduct.length===0 
                ?
                (
                  <p className="text-gray-300 text-lg font-medium bg-slate-700 px-6 py-4 rounded-lg shadow-md">
                    Oops! We couldn’t find anything for you. Explore other categories and keep shopping!
                  </p>
                )
                :
                (
                filterProduct.map((item,index)=>{
                  return(
                  <Card key={index} id={item._id}  image={item.image1} name={item.name}
                  price={item.price} onClick={()=>navigate('/productdetails')} />
                  )
                })
              )
              }
            </div>
    
          </div>
        </div>
    </>
  )
}

export default Collections
