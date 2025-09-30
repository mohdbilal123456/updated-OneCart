import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
      userId: {
            type: String,
            required: true
      },
      items: {
            type: Array,
            required: true
      }, // 👈 isko confirm karo
      amount: {
            type: Number,
            required: true
      },
      address: {
            type: Object,
            required: true
      },
      status: {
            type: String,
            default: "Order Placed"
      },
      date: {
            type: Number
      },
      paymentMethod: {
            type: String
      },
});

export default mongoose.model("Order", orderSchema);
