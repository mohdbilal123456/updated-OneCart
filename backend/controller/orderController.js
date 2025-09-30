import Order from "../models/orderModel.js";
import User from '../models/user.model.js';
import razorpay from 'razorpay'
import dotenv from 'dotenv'
dotenv.config()


var instances = new razorpay ({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET_KEY,
});
let currency ='inr'

// PLACE ORDER
export const placeOrder = async (req, res) => {
  try {
    // console.log("Order body received:", req.body);  // ✅ important
    const { items, amount, address, paymentMethod, payment } = req.body;
    const userId = req.userId;

    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: (paymentMethod || "COD").toUpperCase(), // 👈 frontend se lo
      payment: payment || false,             // 👈 agar online success hua to true
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    // Empty cart after order
    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(201).json({ message: "Order Placed", order: newOrder });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Order Error", error });
  }
};

// placeOrder Razorpay

export const placeOrderRazorpay = async(req,res)=>{
  try {
    
    const { items, amount, address, paymentMethod, payment } = req.body
    const userId = req.userId
    
    const orderData ={
      items,
      amount,
      userId,
      address,
      paymentMethod,
      payment,
      date : Date.now()
    }
    
    const newOrder = new Order(orderData)
    newOrder.save()

    const options = {
      amount : amount *100,
      currency : currency.toUpperCase(),
      receipt : newOrder._id.toString()
    }

    instances.orders.create(options,(error,order)=>{
      if(error)
      {
        console.log(error)
        return res.status(500).json(error)
      }
      return res.status(201).json({ message: "Order Placed", order });
    })
  
  } 
  catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Order Error", error });
  }
}

export const verifyRazorpay = async(req,res)=>{

  try {
    const userId = req.userId
    const {razorpay_order_id} = req.body
    const orderInfo = await instances.orders.fetch(razorpay_order_id)
    if(orderInfo.status === 'paid')
    {
      await Order.findByIdAndUpdate(orderInfo.receipt,{payment :true});
      await User.findByIdAndUpdate(userId , {cartData :{}})
      res.status(200).json({message : 'Payment Successfull'})
    }
    else{
      res.json({message : 'Payment Failed '})
    }
  } 
  catch (error) {
    console.log(error)
  }
}


// USER ORDERS

export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    // console.log("Fetching orders for userId:", userId);

    const orders = await Order.find({ userId }).sort({ createdAt: -1 }); // latest orders first


    if (!orders || orders.length === 0) {
      return res.status(200).json({ message: "No orders found", orders: [] });
    }
    return res.status(200).json({ orders });

  } catch (error) {
    console.log("userOrders error:", error);
    return res.status(500).json({ message: "userOrders error" });
  }
}


// For Admin


export const allOrders = async(req,res)=>{
  try {
    const orders = await Order.find({})
    return res.status(200).json(orders)
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({ message: "adminAllOrders Error", error });
  }
}


export const updateStatus = async(req,res)=>{

  try {
    const {orderId,status}= req.body
    await Order.findByIdAndUpdate(orderId,{status})
    return res.status(201).json({message : 'Status Updated '})
  } 
  catch (error) {
    return res.status(500).json({ message: "upadetd  Error", error });
  }
}