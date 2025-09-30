import React, { useState, useEffect, useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import axios from 'axios';
import { SiEbox } from "react-icons/si";

function View() {
  const [orders, setOrders] = useState([]);
  const { serverUrl } = useContext(authDataContext);

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/list', {}, { withCredentials: true });
      setOrders(result.data.reverse());
    } catch (error) {
      console.log(error);
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(serverUrl + '/api/order/status', { orderId, status: e.target.value }, { withCredentials: true });
      if (result.data) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex'>
      {/* Sidebar fixed left */}
      <Sidebar />

      {/* Main content */}
      <div className='flex-1 ml-[18%] lg:ml-[18%] px-4 lg:px-8 py-6 mt-16'>
        <h1 className='text-2xl md:text-4xl font-bold mb-6'>All Orders List</h1>

        <div className='flex flex-col gap-6'>
          {orders.map((order, index) => (
            <div key={index} className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6 bg-slate-600 rounded-xl p-4 md:p-6'>
              <SiEbox className='w-16 h-16 text-black p-2 rounded-lg bg-white flex-shrink-0' />

              {/* Items List */}
              <div className='flex-1 flex flex-col gap-2'>
                <div className='flex flex-wrap gap-1 text-[#56dbfc]'>
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name.toUpperCase()} * {item.quantity} <span>{item.size}</span>
                      {idx !== order.items.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </div>
                <div className='text-sm text-green-100 mt-2'>
                  <p>{order.address.firstName} {order.address.lastName}</p>
                  <p>{order.address.street}</p>
                  <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.pinCode}</p>
                  <p>{order.address.phone}</p>
                </div>
              </div>

              {/* Order Details */}
              <div className='text-sm text-green-100 mt-2 lg:mt-0'>
                <p>Items: {order.items.length}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                <p className='text-lg font-bold mt-1'>₹ {order.amount}</p>
              </div>

              {/* Status Selector */}
              <select
                value={order.status}
                onChange={(e) => statusHandler(e, order._id)}
                className='px-3 py-2 bg-slate-500 rounded-lg border border-[#96eef3] text-sm mt-2 lg:mt-0'
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default View;
