import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { dataContext } from '../context/AuthContext'
import axios from 'axios'

function Order() {
  const [orderData, setOrderData] = useState([])
  const [expanded, setExpanded] = useState({}) // Track which orders are expanded

  const { currency } = useContext(shopDataContext)
  const { serverUrl } = useContext(dataContext)

  const loadOrderData = async () => {
    try {
      let result = await axios.post(serverUrl + '/api/order/userorder', {}, { withCredentials: true })
      if (result.data) {
        let allOrdersItem = []
        result.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item["date"] = order.date
            item["address"] = order.address // add address for toggle
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  const toggleExpand = (index) => {
    setExpanded(prev => ({ ...prev, [index]: !prev[index] }))
  }

  useEffect(() => {
    loadOrderData()
  }, [])

  return (
    <div className='w-full min-h-screen p-5 pb-36 overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]'>
      <div className='text-center mt-20'>
        <Title text1={'MY'} text2={'ORDER'} />
      </div>

      <div className='mt-10 flex flex-col gap-6'>
        {orderData.map((item, index) => (
          <div key={index} className='w-full border-t border-b rounded-2xl bg-[#51808048] p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 relative'>

            <img src={item.image1} alt="" className='w-full md:w-[130px] h-[130px] rounded-md object-cover' />

            <div className='flex-1 flex flex-col gap-2 md:gap-3'>
              <p className='text-[18px] md:text-[25px] text-[#f3f9fc] font-semibold'>{item.name}</p>

              <div className='flex flex-wrap items-center gap-3 md:gap-6 text-[#aaf4e7] text-[12px] md:text-[18px]'>
                <span>{currency} {item.price}</span>
                <span>Quantity: {item.quantity}</span>
                <span>Size: {item.size}</span>
              </div>

              <div className='text-[#aaf4e7] text-[12px] md:text-[16px]'>
                Date: <span className='text-[#e4fbff] pl-2'>{new Date(item.date).toDateString()}</span>
              </div>

              <div className='text-[#aaf4e7] text-[12px] md:text-[16px]'>
                Payment Method: <span className='text-[#e4fbff]'>{item.paymentMethod}</span>
              </div>

              {/* Toggleable Address & Details */}
              {expanded[index] && (
                <div className='mt-3 text-[#aaf4e7] text-[12px] md:text-[16px]'>
                  <p>Address:</p>
                  <p>{item.address.firstName} {item.address.lastName}</p>
                  <p>{item.address.street}, {item.address.city}</p>
                  <p>{item.address.state} - {item.address.pinCode}</p>
                  <p>{item.address.country}</p>
                  <p>Phone: {item.address.phone}</p>
                </div>
              )}

              {/* Small screens: Status + Track Order */}
              <div className='flex md:hidden flex-col gap-2 mt-3'>
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 rounded-full bg-green-500'></span>
                  <span className='text-[#f3f9fc] text-[12px]'>{item.status}</span>
                </div>
                <div className='flex flex-col gap-2'>
                  <button
                    className='px-3 py-2 rounded-md bg-[#101919] text-[#f3f9fc] text-[12px] cursor-pointer hover:bg-slate-600 transition-all'
                    onClick={loadOrderData}
                  >
                    Track Order
                  </button>
                  <button
                    className='px-3 py-2 rounded-md bg-[#101919] text-[#f3f9fc] text-[12px] cursor-pointer hover:bg-slate-600 transition-all'
                    onClick={() => toggleExpand(index)}
                  >
                    {expanded[index] ? 'Hide Details' : 'Show Details'}
                  </button>
                </div>
              </div>
            </div>

            {/* Medium+ screens: Status + Track Order */}
            <div className='hidden md:flex flex-col items-end justify-center absolute top-1/2 right-5 transform -translate-y-1/2 gap-3'>
              <div className='flex items-center gap-2'>
                <span className='w-2 h-2 rounded-full bg-green-500'></span>
                <span className='text-[#f3f9fc] text-[16px]'>{item.status}</span>
              </div>
              <button
                className='px-5 py-2 rounded-md bg-[#101919] text-[#f3f9fc] text-[16px] cursor-pointer hover:bg-slate-600 transition-all'
                onClick={loadOrderData}
              >
                Track Order
              </button>
              <button
                className='px-5 py-2 rounded-md bg-[#101919] text-[#f3f9fc] text-[16px] cursor-pointer hover:bg-slate-600 transition-all'
                onClick={() => toggleExpand(index)}
              >
                {expanded[index] ? 'Hide Details' : 'Show Details'}
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
