import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { addToCart, deleteFromCart, getUserCart, updateCart } from '../controller/cartController.js'



let cartRoutes = express.Router()

cartRoutes.post('/add',isAuth,addToCart)
cartRoutes.post('/update',isAuth,updateCart)
cartRoutes.get('/cart',isAuth,getUserCart)
cartRoutes.post('/deletecart',isAuth,deleteFromCart)

export default cartRoutes