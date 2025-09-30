import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";
import AuthContext from './context/AuthContext.jsx';
import ShopContext from './context/ShopContext.jsx';
import UserCart from './context/UserCart.jsx';

createRoot(document.getElementById('root')).render(
 
  <BrowserRouter>
  
   <AuthContext>
    <UserCart>
      <ShopContext>
        <App/>
      </ShopContext>
    </UserCart>
   </AuthContext>
   
  </BrowserRouter>
)
