import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDb from './config/db.js'
import authRoute from './routes/auth.Routes.js'
import productRoute from './routes/productRoute.js'
import cookieParser from "cookie-parser";
import cors from 'cors'
import userRoutes from './routes/userRoute.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'


const app = express()
const port = process.env.PORT || 5000
app.use(express.json())

app.use(cookieParser());
app.use(cors({
      origin : ["https://updated-one-cart.netlify.app","http://localhost:5174"],
      credentials :true
}))
app.get("/",(req,res)=>{
      res.send("Hello !!")
})
app.use('/api/auth',authRoute)
app.use('/api/product',productRoute)
app.use('/api/user',userRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/order',orderRoutes)

app.listen(port,()=>{

      console.log(`Server is Started at port ${port}`)
      connectDb()
})
