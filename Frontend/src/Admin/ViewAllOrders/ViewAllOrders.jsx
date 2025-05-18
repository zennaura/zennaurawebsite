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
  const [statusUpdate, setStatusUpdate] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/order/getAllOrders`);
        setOrders(res.data?.data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

  const handleStatusChange = (orderId, value) => {
    setStatusUpdate(prev => ({ ...prev, [orderId]: value }));
  };

  const updateOrderStatus = async (orderId) => {
    try {
      const newStatus = statusUpdate[orderId];
      if (!newStatus) return;

      await axios.put(`${import.meta.env.VITE_BACKEND_LINK}/api/order/updateOrderStatus/${orderId}`, {
        status: newStatus
      });

      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, orderStatus: newStatus } : order
      ));
      
      setStatusUpdate(prev => ({ ...prev, [orderId]: undefined }));
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Failed to update order status');
    }
  };

  const renderUserInfo = (order) => {
    if (order.user) {
      return (
        <>
          <div className="font-medium">{order.user.name || 'Registered User'}</div>
          <div className="text-sm text-gray-500">{order.user.email || 'No email'}</div>
        </>
      );
    } else if (order.guestUser) {
      return (
        <>
          <div className="font-medium">Guest User</div>
          <div className="text-sm text-gray-500">{order.guestUser.email || 'No email'}</div>
          <div className="text-sm text-gray-500">{order.guestUser.phone || 'No phone'}</div>
        </>
      );
    }
    return <div className="font-medium">Unknown User</div>;
  };

  const renderShippingAddress = (order) => {
    if (!order.shippingAddress) return 'No address provided';
    
    if (typeof order.shippingAddress === 'string') {
      return order.shippingAddress;
    }
    
    return (
      <div className="space-y-1">
        <div>{order.shippingAddress.addressLine1}</div>
        {order.shippingAddress.addressLine2 && <div>{order.shippingAddress.addressLine2}</div>}
        <div>
          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
        </div>
        <div>{order.shippingAddress.country}</div>
      </div>
    );
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (user?.userRole !== 'admin') {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-700 mb-4">This page is not accessible by you.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    </div>
  );
  
  if (!orders.length) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-gray-600 text-lg">No orders found</div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <div className="md:w-64 bg-white shadow-md">
        <AdminNavbar />
      </div>
      
      <div className="flex-1 p-4 md:p-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleOrderDetails(order._id)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order._id?.substring(0, 8) || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderUserInfo(order)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {order.orderItems?.length || 0} items
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Rs: {(order.totalAmount || 0).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                            {order.orderStatus || 'Unknown'}
                          </span>
                          <select
                            value={statusUpdate[order._id] || order.orderStatus}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className="text-xs border rounded p-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          {statusUpdate[order._id] && statusUpdate[order._id] !== order.orderStatus && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateOrderStatus(order._id);
                              }}
                              className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                            >
                              Update
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleOrderDetails(order._id);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {expandedOrder === order._id ? 'Hide' : 'View'}
                        </button>
                      </td>
                    </tr>
                    
                    {expandedOrder === order._id && (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 bg-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                              <div className="text-sm text-gray-500">
                                {renderShippingAddress(order)}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Items</h4>
                              <div className="space-y-4">
                                {order.orderItems?.map((item, index) => (
                                  <div key={index} className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                      <img 
                                        src={item.product?.image || 'https://via.placeholder.com/50'} 
                                        alt={item.product?.name || 'Product'} 
                                        className="h-12 w-12 rounded object-cover"
                                        onError={(e) => {
                                          e.target.src = 'https://via.placeholder.com/50';
                                        }}
                                      />
                                    </div>
                                    <div className="text-sm">
                                      <div className="font-medium text-gray-900">{item.product?.name || 'Unknown Product'}</div>
                                      <div>Size: {item.size || 'N/A'}</div>
                                      <div>Qty: {item.quantity || 0}</div>
                                      <div>Price: ${(item.price || 0).toFixed(2)}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Payment Information</h4>
                              <div className="text-sm space-y-2">
                                <div>
                                  <span className="font-medium">Method:</span> {order.paymentMethod || 'N/A'}
                                </div>
                                <div>
                                  <span className="font-medium">Status:</span> 
                                  <span className={`ml-1 px-2 py-1 rounded-full text-xs ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {order.paymentStatus || 'Unknown'}
                                  </span>
                                </div>
                                {order.transactionId && (
                                  <div>
                                    <span className="font-medium">Transaction ID:</span> {order.transactionId}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllOrders;