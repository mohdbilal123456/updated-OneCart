import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart, MdOutlineCollections, MdContacts,} from "react-icons/md";

import { IoMdHome } from "react-icons/io";
import  { shopDataContext } from '../context/ShopContext';
import { userDataContext } from '../context/UserCart';
import axios from 'axios';
import  { dataContext } from '../context/AuthContext';



function Nav() {
      
      let navigate = useNavigate()
     
      let {search,setSearch,showSearch,setShowSearch,getCartCount} = useContext(shopDataContext)  
      let {userData,setUserData} = useContext(userDataContext)
      let {serverUrl} = useContext(dataContext)
      const [showProfile, setShowProfile] = useState(false);

      const handleLogOut = async () => {
            try {
                  await axios.post(serverUrl + '/api/auth/logout', {}, { withCredentials: true });
                  setUserData(null);        // pehle user data clear
                  setShowProfile(false);    // profile dropdown band karo
                  navigate('/login');       // fir login page pe bhejo
                  } catch (error) {
                  console.log(error);
            }
      };

     

  return (

    <>
      <div className='w-[100%] sticky top-0 z-50 h-[70px] flex justify-center items-center bg-[#ecfafaec] '>
            <div className='w-[90%] h-full flex justify-between ' >
                  <div className='flex items-center gap-[5px] h-full'>
                        <img src={logo} className='w-[35px]' alt="" />
                        <h1 className='text-black font-sans text-[20px] md:text-[25px]' >OneCart</h1>
                  </div>

                  <nav className='hidden md:block ' >
                        <ul className='overflow-x-hidden text-white flex h-full lg:gap-6 md:gap-3 items-center'>
                              {
                                    [
                                          {name : "HOME" ,path : "/"},
                                          {name : "COLLECTIONS" ,path : "/collections"},
                                          {name : "ABOUT" ,path : "/about"},
                                          {name : "CONTACT" ,path : "/contact"},
                                    ].map((item)=>(
                                          <li key={item.name} className='text-[14px] lg:text-[15px]
                                          bg-[#000000c9] py-2 px-4 rounded-xl cursor-pointer hover:bg-slate-400 transition ' >
                                          
                                          <Link to={item.path} >{item.name}</Link>
                                          </li>
                                    ))
                              }
                        </ul>
                  </nav>

                  {/* React Icons */}

                  <div className="flex items-center gap-4">
                        {/* Search */}
                        <IoSearchCircleOutline
                        onClick={() => {
                              setShowSearch((prev) => !prev);
                              navigate("/collections");
                        }}
                        className="w-[32px] md:w-[36px] h-[32px] md:h-[36px] text-black cursor-pointer"
                        />

                        {/* Profile */}

                      
                        {
                        userData ? (
                        <div
                              className="w-[30px] h-[30px] bg-black text-white rounded-full flex items-center justify-center font-bold cursor-pointer"
                              onClick={() => setShowProfile(prev => !prev)}
                        >
                              {userData?.name?.[0] || "U"}
                        </div>
                        ) : (
                        <FaUserCircle
                              onClick={() => setShowProfile(prev => !prev)}
                              className="w-[28px] md:w-[30px] h-[28px] md:h-[30px] text-black cursor-pointer"
                        />
                        )
                        }
                                                
                        

                        {/* Cart with Badge */}
                        <div className="relative hidden md:block cursor-pointer">
                        <MdOutlineShoppingCart
                              onClick={() => navigate("/carts")}
                              className="w-[34px] md:w-[38px] h-[34px] md:h-[38px] text-black"
                        />
                        {/* Badge */}
                        <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full">
                              {getCartCount()}
                        </span>
                        </div>
                        </div>

                  
                  {showProfile && (
                  <div className="absolute z-20 top-[110%] right-[4%] w-[200px] md:w-[220px] bg-[#000000d7] border border-[#aaa9a9] rounded-lg">
                  <ul className="text-white text-[20px] py-[3px]">
                        {userData && (
                        <li
                        className="hover:bg-[#2F2F2F] px-4 py-2 cursor-pointer"
                        onClick={() => {
                              handleLogOut();
                              setShowProfile(false);
                        }}
                        >
                        LogOut
                        </li>
                        )}

                        <li
                        className="hover:bg-[#2F2F2F] px-4 py-2 cursor-pointer"
                        onClick={() => {
                        navigate("/about");
                        setShowProfile(false);
                        }}
                        >
                        About
                        </li>
                  </ul>
                  </div>
                  )}

            </div>
                 
                  {/* Mobile NavBar  */}

                  <div className='md:hidden  w-[100%] h-[80px] bg-black  fixed bottom-0 left-0
                  flex justify-center'>
                        <div className='w-[90%] h-[70px] flex justify-between items-center' >
                              <IoMdHome onClick={()=>navigate("/")} 
                              className='text-white h-[25px] w-[25px] cursor-pointer' />
                              <MdOutlineCollections onClick={()=>navigate("/collections")} 
                              className='text-white h-[25px] w-[25px] cursor-pointer'/>
                              <MdContacts onClick={()=>navigate("/contact")} 
                              className='text-white h-[25px] w-[25px] cursor-pointer'/>
                              <MdOutlineShoppingCart onClick={()=>navigate("/carts")} 
                              className='text-white h-[25px] w-[25px] cursor-pointer'/>
                        </div>
                  </div>

      </div>

      {
            showSearch
            ?
            <div className='w-full flex justify-center py-4 bg-[#BED8DB]' >
                  <input type="text" placeholder='Search Here...' 
                  className='bg-[#233533] p-3 placeholder:text-white 
                  text-white font-semibold rounded-[30px] w-[50%] '
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)} />
            </div>
            :
            ""
      }
      
    </>
    
  )
}

export default Nav
