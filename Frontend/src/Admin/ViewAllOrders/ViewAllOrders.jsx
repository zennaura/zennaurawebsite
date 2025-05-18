import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewAllOrders.css';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import {useUser} from '../../components/AuthContext/AuthContext'
import { useNavigate } from 'react-router-dom';

const ViewAllOrders = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/order/getAllOrders`);
        const ordersData = res.data?.data || [];
        setOrders(ordersData);
        
        const userIds = [...new Set(ordersData
          .filter(order => order.user)
          .map(order => order.user)
        )];
        
        await fetchUserDetails(userIds);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    const fetchUserDetails = async (userIds) => {
      try {
        const details = {};
        for (const userId of userIds) {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/userdashboard/singleuser/${userId}`);
          details[userId] = response.data || {};
          console.log(response.data)
        }
        setUserDetails(details);
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    setStatusUpdateLoading(orderId);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_LINK}/api/order/updateStatus/${orderId}`,
        { status: newStatus },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId 
            ? { ...order, orderStatus: newStatus } 
            : order
        )
      );
      
      return response.data;
    } catch (err) {
      console.error('Error updating order status:', err);
      throw err;
    } finally {
      setStatusUpdateLoading(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch {
      return 'Invalid Date';
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const renderUserInfo = (order) => {
    if (order.user) {
      const user = userDetails[order.user] || {};
      return (
        <>
          <div className="customer-name">{user.name || 'Registered User'}</div>
          <div className="customer-email">{user.email || 'No email'}</div>
          <div className="customer-phone">{user.phone || 'No phone'}</div>
        </>
      );
    } else if (order.guestUser) {
      return (
        <>
          <div className="customer-name">Guest User</div>
          <div className="customer-email">{order.guestUser.email || 'No email'}</div>
          <div className="customer-phone">{order.guestUser.phone || 'No phone'}</div>
        </>
      );
    }
    return <div className="customer-name">Unknown User</div>;
  };

  const renderShippingAddress = (order) => {
    if (!order.shippingAddress) return 'No address provided';
    
    if (typeof order.shippingAddress === 'string') {
      return order.shippingAddress;
    }
    
    return (
      <div className="shipping-address-details">
        <div>{order.shippingAddress.addressLine1}</div>
        {order.shippingAddress.addressLine2 && <div>{order.shippingAddress.addressLine2}</div>}
        <div>
          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
        </div>
        <div>{order.shippingAddress.country}</div>
      </div>
    );
  };

  if (loading) return <div className="main-container">Loading orders...</div>;
  if (error) return <div className="main-container">{error}</div>;
  if (!orders.length) return <div className="main-container">No orders found</div>;

  if (user?.userRole !== 'admin') {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-700 mb-4">This page is not accessible by you.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="left-container">
        <AdminNavbar/>
      </div>
      <div className="right-container">
        <div className="admin-ordershow app-content">
          <div className="app-content-header">
            <h1 className="app-content-headerText">Orders</h1>
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
              <div className="order-cell customer">Customer Name</div>
              <div className="order-cell customer">Contact Number</div>
              <div className="order-cell customer">Email</div>
              <div className="order-cell date">Date</div>
              <div className="order-cell items">Items</div>
              <div className="order-cell amount">Amount</div>
              <div className="order-cell status">Status</div>
              <div className="order-cell actions">Actions</div>
            </div>
            
            {orders.map((order) => (
              <React.Fragment key={order._id || Math.random()}>
                <div className="orders-row" onClick={() => toggleOrderDetails(order._id)}>
                  <div className="order-cell order-id">
                    <span>{order._id?.substring(0, 8) || 'N/A'}</span>
                  </div>
                  <div className="order-cell customer">
                    {order.user ? (userDetails[order.user]?.firstName+ " " + userDetails[order.user]?.lastName  || 'Registered User') : 
                     order.guestUser?.firstName +" "+order.guestUser?.lastName  || 'Guest User'}
                  </div>
                  <div className="order-cell customer">
                    {order.user ? (userDetails[order.user]?.phone || 'N/A') : 
                     order.guestUser?.phone || 'N/A'}
                  </div>
                  <div className="order-cell customer">
                    {order.user ? (userDetails[order.user]?.email || 'N/A') : 
                     order.guestUser?.email || 'N/A'}
                  </div>
                  <div className="order-cell date">
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="order-cell items">
                    <div className="items-count">
                      {order.orderItems?.length || 0} items
                    </div>
                  </div>
                  <div className="order-cell amount">
                    <span>${(order.totalAmount || 0).toFixed(2)}</span>
                  </div>
                  <div className="order-cell status">
                     <div className="status-select-wrapper">
                       {statusUpdateLoading === order._id ? (
                         <div className="status-loading">Updating...</div>
                       ) : (
                         <select
                           value={order.orderStatus || ''}
                           onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                           className={`status-select ${(order.orderStatus || '').toLowerCase()}`}
                         >
                           <option value="processing">Processing</option>
                           <option value="shipped">Shipped</option>
                           <option value="delivered">Delivered</option>
                           <option value="cancelled">Cancelled</option>
                         </select>
                       )}
                     </div>
                  </div>
                  <div className="order-cell actions">
                    <button 
                      className="view-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOrderDetails(order._id);
                      }}
                    >
                      {expandedOrder === order._id ? 'Hide' : 'View'}
                    </button>
                  </div>
                </div>

                {expandedOrder === order._id && (
                  <div className="order-details-expanded">
                    <div className="details-section">
                      <h4>Customer Details</h4>
                      {renderUserInfo(order)}
                    </div>
                    <div className="details-section">
                      <h4>Shipping Address</h4>
                      {renderShippingAddress(order)}
                    </div>
                    <div className="details-section">
                      <h4>Items</h4>
                      <div className="items-list-expanded">
                        {order.orderItems?.map((item, index) => (
                          <div key={index} className="item-detail">
                            <div className="item-image">
                              <img 
                                src={item.product?.image || 'https://via.placeholder.com/50'} 
                                alt={item.product?.name || 'Product'} 
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/50';
                                }}
                              />
                            </div>
                            <div className="item-info">
                              <div>{item.product?.name || 'Unknown Product'}</div>
                              <div>Size: {item.size || 'N/A'}</div>
                              <div>Qty: {item.quantity || 0}</div>
                              <div>Price: ${(item.price || 0).toFixed(2)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="details-section">
                      <h4>Payment Information</h4>
                      <div>
                        <div>Method: {order.paymentMethod || 'N/A'}</div>
                        <div className={`payment-status ${(order.paymentStatus || '').toLowerCase()}`}>
                          Status: {order.paymentStatus || 'Unknown'}
                        </div>
                        {order.transactionId && (
                          <div>Transaction ID: {order.transactionId}</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllOrders;