import React, { useContext } from 'react'
import { Routes, Route, useLocation, Navigate } from "react-router";
import Registration from './pages/Registration'
import Login from './pages/Login';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import Nav from './component/Nav';
import About from './pages/About';
import Collections from './pages/Collections'
import Contact from './pages/Contact'
import ProductDetails from './pages/ProductDetails';
import Cart from './component/Cart';
import { userDataContext } from './context/UserCart';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import Ai from './component/Ai';

export default function App() {
  let {userData} = useContext(userDataContext)
  
  let location = useLocation()
  // console.log("App.jsx userData:", userData);
  return (
    <>
      <Ai/>
      <ToastContainer/>
      {userData && <Nav/> } 
      
      <Routes>
        <Route path='/signup' element={userData ? (<Navigate to={location.state?.from || '/'} />)
          : (<Registration />)} />

        <Route path='/login' element={
          userData ? (<Navigate to={location.state?.from || '/'} />)
            : (<Login />)} />

        <Route path='/' element={
          userData ? <Home /> : <Navigate to='/login' state={{ from: location.pathname }} />
        } />

        <Route path='/about' element={
          userData ? <About /> : <Navigate to='/login' state={{ from: location.pathname }} />
        } />
        <Route path='/collections' element={
          userData ? <Collections /> : <Navigate to='/login' state={{ from: location.pathname }} />
        } />
        {/* <Route path='/product' element={
          userData ? <Product /> : <Navigate to='/login' state={{ from: location.pathname }} />
        } /> */}
        <Route path='/productdetails/:productId' element={
          userData ? <ProductDetails/> : <Navigate to='/login' state={{ from: location.pathname }} />
        } />
        <Route path='/carts' element={
          userData ?  <Cart/> : <Navigate to='/login' state={{ from: location.pathname }} />
        } />
        <Route path='/contact' element={
          userData ? <Contact /> : <Navigate to='/login' state={{ from: location.pathname }} />
        } />
        <Route path='/placeorder' element={
          userData ? <PlaceOrder/> : <Navigate to='/login' state={{ from: location.pathname }} />
        } />
        <Route path='/order' element={
          userData ? <Order/> : <Navigate to='/login' state={{ from: location.pathname }} />
        } />
        {/* <Route path='*' element={<NotFound/>} /> */}

      </Routes>
    </>
  )
}
