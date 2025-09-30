import React, { Children, createContext } from 'react'

export const dataContext =createContext()


function AuthContext({children}) {

  let serverUrl = "http://localhost:3000"
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
