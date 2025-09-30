import User from "../models/user.model.js"



export const addToCart = async(req,res)=>{

      try 
      {
            let {itemId,size} = req.body
            // console.log("req.user",req.userId)

            const userData = await User.findById(req.userId)
            console.log(userData.cartData)

            if(!userData)
            {
                  return res.status(404).json({ message: "User not found" });
            }

            let cartData = userData.cartData 

            if(cartData[itemId])
            {
                  if(cartData[itemId][size])
                  {
                        cartData[itemId][size]+=1
                  }
                  else{
                        cartData[itemId][size] = 1
                  }
            }
            else{
                  cartData[itemId] = {}
                  cartData[itemId][size] = 1
            }

            await User.findByIdAndUpdate(req.userId,{cartData})
            // User.findByIdAndUpdate(req.userId, { cartData }) → Database me us user ke 
            // document ka cartData field replace/overwrite karta hai updated cartData se.
            return res.status(201).json({ message: "Added to cart" });

      } 
      catch (error) {
            console.log(error);
            return res.status(500).json({ message: "addToCart error" });
      }

}

export const updateCart = async(req,res)=>{

      try {
           const {itemId,size,quantity} = req.body
           
           let userData = await User.findById(req.userId)
           let cartData = await userData.cartData
           
           cartData[itemId][size] = quantity

           await User.findByIdAndUpdate(req.userId,{cartData})
           
            if(!userData)
            {
                  return res.status(404).json({ message: "User not found" });
            }

           
      } 
      catch (error) {
            console.log(error)
            return res.status(500).json({message:"updateCart error"})
      }

}

export const deleteFromCart = async (req, res) => {

      try {
      const { itemId, size } = req.body;
      //      console.log("req.user",req.userId)
      const userData = await User.findById(req.userId);
      //     console.log('userData',userData)
      if (!userData) return res.status(404).json({ message: "User not found !!" });
            
      let cartData = userData.cartData || {};

      if (cartData[itemId] && cartData[itemId][size] !== undefined) {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId]; // Remove item if no sizes left
            }

            await User.findByIdAndUpdate(req.userId, { cartData });
            return res.status(200).json({ message: "Item removed from cart", cartData });
      } else {
            return res.status(404).json({ message: "Item not found in cart" });
      }
      } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Delete cart error" });
      }
     
};


export const getUserCart = async(req,res)=>{

      try {
           const userData = await User.findById(req.userId) 
           let cartData = await userData.cartData
           return res.status(201).json(cartData)
      } 
      catch (error) {
            console.log(error)
            return res.status(500).json({message:"getUserCart error"})
      }
}