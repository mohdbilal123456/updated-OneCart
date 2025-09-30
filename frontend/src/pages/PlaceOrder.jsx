import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import razorpay from '../assets/razorpay.jpg'
import { shopDataContext } from '../context/ShopContext'
import { dataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function PlaceOrder() {

  const [method, setMethod] = useState('cod')
  const navigate = useNavigate()
  const { cartItem, setCartItem, getCartAmount, delivery_fees, products } = useContext(shopDataContext)
  const { serverUrl } = useContext(dataContext)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: ""
  });

  const [errors, setErrors] = useState({})

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData(data => ({ ...data, [name]: value }))

    // Remove error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  // Validation function
  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.street.trim()) newErrors.street = "Street is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (!formData.pinCode.trim()) newErrors.pinCode = "Pin Code is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required"
    return newErrors
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_API_KEY,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        const { data } = await axios.post(serverUrl + '/api/order/verifyrazorpay', response, { withCredentials: true })
        if (data) {
          navigate("/order")
          setCartItem({})

        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    // Form Validation
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      // Prepare order items
      let orderItems = []
      for (const productId in cartItem) {
        for (const size in cartItem[productId]) {
          if (cartItem[productId][size] > 0) {
            const product = products.find(p => p._id === productId)
            if (product) {
              orderItems.push({
                _id: product._id.toString(),
                name: product.name,
                image1: product.image1,
                description: product.description,
                price: product.price,
                category: product.category,
                subCategory: product.subCategory,
                sizes: product.sizes || [],
                date: product.date,
                bestseller: product.bestseller,
                size: size,
                quantity: cartItem[productId][size]
              })
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Select at least one product before placing order")
        return
      }

      const orderAmount = Number(getCartAmount()) + Number(delivery_fees || 0)
      const orderData = {
        address: formData,
        items: orderItems,
        amount: orderAmount,
        paymentMethod: method,
        payment: method === "razorpay",
      }

      if (method === 'cod') {
        const result = await axios.post(serverUrl + '/api/order/placeorder', orderData, { withCredentials: true })
        if (result.data) {
          setCartItem({})
          toast.success("Order placed successfully!")
          navigate('/order')
        } else {
          toast.error("Failed to place COD order!")
        }
      }
      else if (method === 'razorpay') {
        const resultRazorpay = await axios.post(serverUrl + '/api/order/razorpay', orderData, { withCredentials: true })
        if (resultRazorpay.data.order) {
          initPay(resultRazorpay.data.order)
        }
        else {
          toast.error("Failed to initialize Razorpay")
        }
      }

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong while placing order")
    }
  }

  return (
    <div className="w-full min-h-[calc(100vh-70px)] py-22 bg-gradient-to-l from-[#141414] to-[#0c2025] flex justify-center items-center">
      <div className="w-[90%] flex flex-col lg:flex-row gap-6">

        {/* Left: Delivery Info Form */}
        <div className="w-full lg:w-[55%] p-6 rounded-2xl">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          <form className="mt-6 space-y-4 text-white" onSubmit={onSubmitHandler}>

            {/* First & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <input type="text" name="firstName" value={formData.firstName} onChange={onChangeHandler} placeholder="First Name"
                  className="w-full rounded-lg bg-[#374151] text-white placeholder-gray-300 p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                {errors.firstName && <span className="text-red-400 text-sm mt-1">{errors.firstName}</span>}
              </div>
              <div className="flex flex-col">
                <input type="text" name="lastName" value={formData.lastName} onChange={onChangeHandler} placeholder="Last Name"
                  className="w-full rounded-lg bg-[#374151] text-white placeholder-gray-300 p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                {errors.lastName && <span className="text-red-400 text-sm mt-1">{errors.lastName}</span>}
              </div>
            </div>

            {/* Street */}
            <div className="flex flex-col">
              <input type="text" name="street" value={formData.street} onChange={onChangeHandler} placeholder="Street Address"
                className="w-full rounded-lg bg-[#374151] text-white placeholder-gray-300 p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
              {errors.street && <span className="text-red-400 text-sm mt-1">{errors.street}</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <input type="email" name="email" value={formData.email} onChange={onChangeHandler} placeholder="Email"
                className="w-full rounded-lg bg-[#374151] text-white placeholder-gray-300 p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
              {errors.email && <span className="text-red-400 text-sm mt-1">{errors.email}</span>}
            </div>

            {/* City & State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <input type="text" name="city" value={formData.city} onChange={onChangeHandler} placeholder="City"
                  className="w-full rounded-lg bg-[#374151] text-white placeholder-gray-300 p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                {errors.city && <span className="text-red-400 text-sm mt-1">{errors.city}</span>}
              </div>
              <div className="flex flex-col">
                <input type="text" name="state" value={formData.state} onChange={onChangeHandler} placeholder="State"
                  className="w-full rounded-lg bg-[#374151] text-white placeholder-gray-300 p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                {errors.state && <span className="text-red-400 text-sm mt-1">{errors.state}</span>}
              </div>
            </div>

            {/* Country & Pin Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <input type="text" name="country" value={formData.country} onChange={onChangeHandler} placeholder="Country"
                  className="w-full rounded-lg bg-[#374151] text-white placeholder-gray-300 p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                {errors.country && <span className="text-red-400 text-sm mt-1">{errors.country}</span>}
              </div>
              <div className="flex flex-col">
                <input type="number" name="pinCode" value={formData.pinCode} onChange={onChangeHandler} placeholder="Pin Code"
                  className="w-full rounded-lg bg-[#374151] text-white placeholder-gray-300 p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                {errors.pinCode && <span className="text-red-400 text-sm mt-1">{errors.pinCode}</span>}
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <input type="tel" name="phone" value={formData.phone} onChange={onChangeHandler} placeholder="Phone Number"
                className="w-full rounded-lg bg-[#374151] text-white placeholder-gray-300 p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
              {errors.phone && <span className="text-red-400 text-sm mt-1">{errors.phone}</span>}
            </div>

          </form>
        </div>

        {/* Right: CartTotal + Payment */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          <CartTotal />

          {/* Payment Section */}
          <div className="w-full text-center">
            <Title text1={'PAYMENT'} text2={'METHOD'} />

            {/* Payment Buttons */}
            <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                type="button"
                className={`w-[160px] h-[50px] rounded-md shadow-md border 
                  ${method === "razorpay" ? "border-blue-500 ring-4 ring-blue-500" : "border-gray-300"} 
                  bg-white hover:scale-105 transition`}
                onClick={() => setMethod("razorpay")}
              >
                <img src={razorpay} alt="Razorpay" className="w-full h-full object-cover rounded-md" />
              </button>

              <button
                type="button"
                className={`w-[200px] h-[50px] text-sm px-4 rounded-md font-bold shadow-md 
                  ${method === "cod"
                    ? "border-4 border-blue-500 ring-2 ring-blue-500 bg-gradient-to-t from-[#95b3f8] to-white text-[#332f6f]"
                    : "border-2 border-blue-900 bg-gradient-to-t from-[#95b3f8] to-white text-[#332f6f]"} 
                  hover:scale-105 transition`}
                onClick={() => setMethod("cod")}
              >
                Cash On Delivery
              </button>
            </div>

            {/* Place Order Button */}
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={onSubmitHandler}
                className="w-full sm:w-[60%] lg:w-[48%] py-3 cursor-pointer rounded-xl 
                  bg-[#46d1f7] text-black font-semibold text-lg 
                  hover:scale-105 transition shadow-md"
              >
                Place Order
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default PlaceOrder
