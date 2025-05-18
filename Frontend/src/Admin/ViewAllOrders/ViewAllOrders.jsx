import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import { useUser } from '../../components/AuthContext/AuthContext';
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
        <div className="space-y-1">
          <div className="font-semibold text-gray-800">{user.name || 'Registered User'}</div>
          <div className="text-sm text-gray-600 flex items-center">
            <span className="mr-1">✉️</span>
            {user.email || 'No email'}
          </div>
          <div className="text-sm text-gray-600 flex items-center">
            <span className="mr-1">📱</span>
            {user.phone || 'No phone'}
          </div>
        </div>
      );
    } else if (order.guestUser) {
      return (
        <div className="space-y-1">
          <div className="font-semibold text-gray-800">Guest User</div>
          <div className="text-sm text-gray-600 flex items-center">
            <span className="mr-1">✉️</span>
            {order.guestUser.email || 'No email'}
          </div>
          <div className="text-sm text-gray-600 flex items-center">
            <span className="mr-1">📱</span>
            {order.guestUser.phone || 'No phone'}
          </div>
        </div>
      );
    }
    return <div className="font-semibold text-gray-800">Unknown User</div>;
  };

  const renderShippingAddress = (order) => {
    if (!order.shippingAddress) return 'No address provided';
    
    if (typeof order.shippingAddress === 'string') {
      return order.shippingAddress;
    }
    
    return (
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <div className="flex items-start">
          <span className="inline-block w-1 h-1 mt-2 mr-2 bg-gray-400 rounded-full"></span>
          <div>{order.shippingAddress.addressLine1}</div>
        </div>
        {order.shippingAddress.addressLine2 && (
          <div className="flex items-start">
            <span className="inline-block w-1 h-1 mt-2 mr-2 bg-gray-400 rounded-full"></span>
            <div>{order.shippingAddress.addressLine2}</div>
          </div>
        )}
        <div className="flex items-start">
          <span className="inline-block w-1 h-1 mt-2 mr-2 bg-gray-400 rounded-full"></span>
          <div>
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
          </div>
        </div>
        <div className="flex items-start">
          <span className="inline-block w-1 h-1 mt-2 mr-2 bg-gray-400 rounded-full"></span>
          <div>{order.shippingAddress.country}</div>
        </div>
      </div>
    );
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading orders...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">{error}</div>;
  if (!orders.length) return <div className="flex justify-center items-center h-screen">No orders found</div>;

  if (user?.userRole !== 'admin') {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-700 mb-4">This page is not accessible by you.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 md:flex-row">
      <div className="w-full md:w-64 lg:w-72 xl:w-80 bg-white shadow-md md:h-screen md:sticky md:top-0 z-10">
        <AdminNavbar />
      </div>
      
      <div className="flex-1 p-4 md:p-6">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 relative pb-2">
              Orders
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <input 
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="Search..." 
              type="text"
            />
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <span>Filter</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                  </svg>
                </button>
                
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-20 opacity-0 invisible translate-y-2 transition-all duration-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3">
                    <option>All Orders</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                  
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4">
                    <option>All Payments</option>
                    <option>Paid</option>
                    <option>Pending</option>
                  </select>
                  
                  <div className="flex justify-end gap-2">
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                      Reset
                    </button>
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Table Header - Hidden on mobile, shown on desktop */}
            <div className="hidden md:grid md:grid-cols-12 bg-gray-50 px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
              <div className="col-span-2">Order ID</div>
              <div className="col-span-2">Customer</div>
              <div className="col-span-1">Phone</div>
              <div className="col-span-2">Email</div>
              <div className="col-span-1">Date</div>
              <div className="col-span-1">Items</div>
              <div className="col-span-1">Amount</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1">Actions</div>
            </div>
            
            {/* Orders List */}
            {orders.map((order) => (
              <React.Fragment key={order._id || Math.random()}>
                <div 
                  className={`grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer ${expandedOrder === order._id ? 'bg-blue-50' : ''}`}
                  onClick={() => toggleOrderDetails(order._id)}
                >
                  {/* Order ID */}
                  <div className="md:col-span-2">
                    <div className="md:hidden text-xs font-medium text-gray-500">Order ID</div>
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {order._id?.substring(0, 8) || 'N/A'}
                    </div>
                  </div>
                  
                  {/* Customer Name */}
                  <div className="md:col-span-2">
                    <div className="md:hidden text-xs font-medium text-gray-500">Customer</div>
                    <div className="text-sm font-medium text-gray-900">
                      {order.user ? 
                        (userDetails[order.user]?.firstName + " " + userDetails[order.user]?.lastName || 'Registered User') : 
                        (order.guestUser?.firstName + " " + order.guestUser?.lastName || 'Guest User')
                      }
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div className="md:col-span-1">
                    <div className="md:hidden text-xs font-medium text-gray-500">Phone</div>
                    <div className="text-sm text-gray-600">
                      {order.user ? 
                        (userDetails[order.user]?.phone || 'N/A') : 
                        (order.guestUser?.phone || 'N/A')
                      }
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="md:col-span-2">
                    <div className="md:hidden text-xs font-medium text-gray-500">Email</div>
                    <div className="text-sm text-gray-600 truncate">
                      {order.user ? 
                        (userDetails[order.user]?.email || 'N/A') : 
                        (order.guestUser?.email || 'N/A')
                      }
                    </div>
                  </div>
                  
                  {/* Date */}
                  <div className="md:col-span-1">
                    <div className="md:hidden text-xs font-medium text-gray-500">Date</div>
                    <div className="text-sm text-gray-600">
                      {formatDate(order.createdAt)}
                    </div>
                  </div>
                  
                  {/* Items */}
                  <div className="md:col-span-1">
                    <div className="md:hidden text-xs font-medium text-gray-500">Items</div>
                    <div className="text-sm text-gray-600">
                      {order.orderItems?.length || 0} items
                    </div>
                  </div>
                  
                  {/* Amount */}
                  <div className="md:col-span-1">
                    <div className="md:hidden text-xs font-medium text-gray-500">Amount</div>
                    <div className="text-sm font-medium text-gray-900">
                      ${(order.totalAmount || 0).toFixed(2)}
                    </div>
                  </div>
                  
                  {/* Status */}
                  <div className="md:col-span-1">
                    <div className="md:hidden text-xs font-medium text-gray-500">Status</div>
                    <div className="text-sm">
                      {statusUpdateLoading === order._id ? (
                        <div className="text-gray-500">Updating...</div>
                      ) : (
                        <select
                          value={order.orderStatus || ''}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className={`text-xs font-semibold px-2 py-1 rounded-full capitalize focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                            order.orderStatus === 'processing' ? 'bg-orange-100 text-orange-800' :
                            order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="md:col-span-1 flex justify-end">
                    <button 
                      className="text-sm px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOrderDetails(order._id);
                      }}
                    >
                      {expandedOrder === order._id ? 'Hide' : 'View'}
                    </button>
                  </div>
                </div>

                {/* Expanded Order Details */}
                {expandedOrder === order._id && (
                  <div className="p-4 bg-gray-50 border-b border-gray-200 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Customer Details */}
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h4 className="text-lg font-medium text-gray-800 mb-3 pb-2 border-b border-gray-200 flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                          Customer Details
                        </h4>
                        {renderUserInfo(order)}
                      </div>
                      
                      {/* Shipping Address */}
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h4 className="text-lg font-medium text-gray-800 mb-3 pb-2 border-b border-gray-200 flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                          Shipping Address
                        </h4>
                        {renderShippingAddress(order)}
                      </div>
                      
                      {/* Payment Information */}
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h4 className="text-lg font-medium text-gray-800 mb-3 pb-2 border-b border-gray-200 flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                          Payment Information
                        </h4>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Method:</span> {order.paymentMethod || 'N/A'}
                          </div>
                          <div className={`text-sm px-2 py-1 rounded-md inline-flex items-center ${
                            order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                            order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            <span className="w-2 h-2 rounded-full mr-2 bg-current"></span>
                            <span className="font-medium">Status:</span> {order.paymentStatus || 'Unknown'}
                          </div>
                          {order.transactionId && (
                            <div className="text-sm">
                              <span className="font-medium text-gray-700">Transaction ID:</span> {order.transactionId}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Order Items */}
                    <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h4 className="text-lg font-medium text-gray-800 mb-3 pb-2 border-b border-gray-200 flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                        Items ({order.orderItems?.length || 0})
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {order.orderItems?.map((item, index) => (
                          <div key={index} className="flex items-start p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                              <img 
                                src={item.product?.image || 'https://via.placeholder.com/50'} 
                                alt={item.product?.name || 'Product'} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/50';
                                }}
                              />
                            </div>
                            <div className="ml-3 flex-1">
                              <div className="font-medium text-gray-800">{item.product?.name || 'Unknown Product'}</div>
                              <div className="text-sm text-gray-600">Size: {item.size || 'N/A'}</div>
                              <div className="text-sm text-gray-600">Qty: {item.quantity || 0}</div>
                              <div className="text-sm font-medium text-gray-900">Price: ${(item.price || 0).toFixed(2)}</div>
                            </div>
                          </div>
                        ))}
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