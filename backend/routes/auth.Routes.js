import express from 'express'
import { adminLogin, googleLogin, login, logOut, registration } from '../controller/authController.js'


let authRoute = express.Router()

authRoute.post('/registration',registration)
authRoute.post('/login',login)
authRoute.post('/logout',logOut)
authRoute.post("/googlelogin",googleLogin)
authRoute.post('/adminlogin',adminLogin)
export default authRoute