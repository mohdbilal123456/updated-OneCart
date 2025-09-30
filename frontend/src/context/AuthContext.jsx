import React, { Children, createContext } from 'react'

export const dataContext =createContext()


function AuthContext({children}) {

  let serverUrl = "https://updated-onecart-backend.onrender.com"
  let value ={
    serverUrl
  }
  return (
    <>
      <dataContext.Provider value={value}>
          {children}
      </dataContext.Provider>
      
    </>
  )
}

export default AuthContext
