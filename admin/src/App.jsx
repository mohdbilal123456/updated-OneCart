import React from 'react'
import Nav from './component/Nav'
import { Routes, Route } from "react-router";
import Home from './page/Home';
import Login from './page/Login';
import AuthContext from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import Add from '../src/page/Add'
import List from '../src/page/List'
import View from '../src/page/View'


function App() {
  return (
    <>
    <ToastContainer/>
    
    {/* <AuthContext> */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/add' element={<Add/>} />
        <Route path='/lists' element={<List/>} />
        <Route path='/orders' element={<View/>} />
      </Routes>
    {/* </AuthContext> */}
    </>
  )
}

export default App
