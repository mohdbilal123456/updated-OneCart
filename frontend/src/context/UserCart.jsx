import React, { createContext, useContext, useEffect, useState } from 'react'
import { dataContext } from '../context/AuthContext'
import axios from 'axios'

export const userDataContext = createContext()

function UserCart({children}) {
  let {serverUrl} = useContext(dataContext)
  let [userData,setUserData] = useState(null)
  let [loading,setLoading] = useState(true)

  let getCurrentUser = async()=>{

    try {
      let result = await axios.get(serverUrl + '/api/user/getcurrentuser',
        {withCredentials:true}
      )
      console.log('result',result.data)
      setUserData(result.data)
    } 
    catch (error) {
      console.log('Auth Error', error);
      setUserData(null);
    }

  }

  useEffect(()=>{
    getCurrentUser()
  },[])

  let value ={
    getCurrentUser,userData,setUserData
  }


  return (
    <>
    <userDataContext.Provider value={value} >
      {children}
    </userDataContext.Provider>
    </>
  )
}

export default UserCart