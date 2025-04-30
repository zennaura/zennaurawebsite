import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './ViewAllOrders.css';
import AdminNavbar from '../AdminNavbar/AdminNavbar'

const ViewAllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/order/getAllOrders`);
        setOrders(res.data.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);


  // Format date to readable string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="main-container">
      <div className="left-container">
          <AdminNavbar/>
      </div>
      <div className="right-container">
      <div className="admin-ordershow app-content">
      <div className="app-content-header">
        <h1 className="app-content-headerText">Orders</h1>
        <button className="mode-switch" title="Switch Theme">
          <svg className="moon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="24" height="24" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        </button>
      </div>
      
      <div className="app-content-actions">
        <input className="search-bar" placeholder="Search..." type="text"/>
        <div className="app-content-actions-wrapper">
          <div className="filter-button-wrapper">
            <button className="action-button filter jsFilter">
              <span>Filter</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
            </button>
            <div className="filter-menu">
              <label>Order Status</label>
              <select>
                <option>All Orders</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
              <label>Payment Status</label>
              <select>
                <option>All Payments</option>
                <option>Paid</option>
                <option>Pending</option>
              </select>
              <div className="filter-menu-buttons">
                <button className="filter-button reset">Reset</button>
                <button className="filter-button apply">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="orders-area-wrapper">
        <div className="orders-header">
          <div className="order-cell order-id">Order ID</div>
          <div className="order-cell customer">Customer</div>
          <div className="order-cell date">Date</div>
          <div className="order-cell items">Items</div>
          <div className="order-cell amount">Amount</div>
          <div className="order-cell payment">Payment</div>
          <div className="order-cell status">Status</div>
          <div className="order-cell actions">Actions</div>
        </div>
        
        {orders.map((order) => (
          <div className="orders-row" key={order._id}>
            <div className="order-cell order-id">
              <span>{order._id}</span>
            </div>
            <div className="order-cell customer">
              <div className="customer-name">{order.user.name}</div>
              <div className="customer-email">{order.user.email}</div>
            </div>
            <div className="order-cell date">
              <span>{formatDate(order.createdAt)}</span>
            </div>
            <div className="order-cell items">
              <div className="items-list">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="item">
                    {item.quantity}x {item.product.name} (${item.price.toFixed(2)})
                  </div>
                ))}
              </div>
            </div>
            <div className="order-cell amount">
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="order-cell payment">
              <div className="payment-method">{order.paymentMethod}</div>
              <div className={`payment-status ${order.paymentStatus.toLowerCase()}`}>
                {order.paymentStatus}
              </div>
            </div>
            <div className="order-cell status">
              <span className={`order-status ${order.orderStatus.toLowerCase()}`}>
                {order.orderStatus}
              </span>
            </div>
            <div className="order-cell actions">
              <button className="view-button">View</button>
              <button className="action-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"/>
                  <circle cx="12" cy="5" r="1"/>
                  <circle cx="12" cy="19" r="1"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
      </div>
    </div>
    
  );
};

export default ViewAllOrders;