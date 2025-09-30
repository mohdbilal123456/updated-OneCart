import uploadImage from "../config/cloudinary.js"
import Product from '../models/product.model.js'

export const addProduct = async(req,res)=>{

      try {
           console.log('Body',req.body) 
           console.log('Files',req.files) 
           let {name,price,category,subCategory,date,sizes,bestseller,description}=req.body

           let image1 = req.files?.image1 ? await uploadImage(req.files.image1[0].path) : null
           let image2 = req.files?.image1 ? await uploadImage(req.files.image2[0].path) : null
           let image3 = req.files?.image1 ? await uploadImage(req.files.image3[0].path) : null
           let image4 = req.files?.image1 ? await uploadImage(req.files.image4[0].path) : null

            let productData = {
                  name,
                  description,
                  price:Number(price),
                  category,
                  subCategory,
                  sizes:JSON.parse(sizes),
                  date : Date.now(),
                  image1,
                  image2,
                  image3,
                  image4,
                  bestseller
            }

            const product = await Product.create(productData)
            return res.status(201).json(product)

      } 
      catch (error) {
            console.error("Add Product error:", error);
            return res.status(500).json({ message: `Add Product Error: ${error.message}` });
      }

}

export const listProduct = async(req,res)=>{

      try {
           let product = await Product.find({}) 
           return res.status(201).json(product)
      } 
      catch (error) {
            console.error("List Product error:", error);
            return res.status(500).json({ message: `List Product Error: ${error.message}` });
      }
}

export const removeList = async(req,res)=>{

      try {
            let {id} = req.params
            const product = await Product.findByIdAndDelete(id)
            return res.status(201).json(product)
      } 
      catch (error) {
            console.error("List Product error:", error);
            return res.status(500).json({ message: `List Product Error: ${error.message}` });
      }
}