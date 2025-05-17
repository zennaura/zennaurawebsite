import React from 'react';
import './Homepage.css';
import {useUser} from '../../components/AuthContext/AuthContext'

const Home = () => {
  const { user } = useUser();
  
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
    <div className="admin-home-content">
      {/* Header Section */}
      <div className="admin-home-content-header">
        <h1 className="admin-home-title">Admin Dashboard</h1>
        <button className="admin-home-theme-switch" title="Switch Theme">
          <svg className="admin-home-moon-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="24" height="24" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        </button>
      </div>
      
      {/* Stats Cards */}
      <div className="admin-home-stats-grid">
        <div className="admin-home-stat-card">
          <div className="admin-home-stat-header">
            <span>Total Revenue</span>
            <span className="admin-home-stat-change positive">+12%</span>
          </div>
          <div className="admin-home-stat-value">$24,780</div>
          <div className="admin-home-stat-graph">
            <svg viewBox="0 0 100 40" className="admin-home-stat-svg">
              <path d="M0 40 L20 28 L40 32 L60 20 L80 28 L100 15" stroke="#4CAF50" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
        
        <div className="admin-home-stat-card">
          <div className="admin-home-stat-header">
            <span>New Orders</span>
            <span className="admin-home-stat-change positive">+8%</span>
          </div>
          <div className="admin-home-stat-value">1,245</div>
          <div className="admin-home-stat-graph">
            <svg viewBox="0 0 100 40" className="admin-home-stat-svg">
              <path d="M0 35 L20 25 L40 30 L60 20 L80 25 L100 15" stroke="#2196F3" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
        
        <div className="admin-home-stat-card">
          <div className="admin-home-stat-header">
            <span>Active Products</span>
            <span className="admin-home-stat-change negative">-3%</span>
          </div>
          <div className="admin-home-stat-value">342</div>
          <div className="admin-home-stat-graph">
            <svg viewBox="0 0 100 40" className="admin-home-stat-svg">
              <path d="M0 25 L20 30 L40 28 L60 35 L80 30 L100 20" stroke="#FF9800" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
        
        <div className="admin-home-stat-card">
          <div className="admin-home-stat-header">
            <span>Customer Satisfaction</span>
            <span className="admin-home-stat-change positive">+5%</span>
          </div>
          <div className="admin-home-stat-value">94%</div>
          <div className="admin-home-stat-graph">
            <svg viewBox="0 0 100 40" className="admin-home-stat-svg">
              <path d="M0 30 L20 25 L40 28 L60 22 L80 25 L100 20" stroke="#9C27B0" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Recent Activity and Charts */}
      <div className="admin-home-main-grid">
        <div className="admin-home-recent-orders">
          <div className="admin-home-section-header">
            <h2>Recent Orders</h2>
            <a href="#" className="admin-home-view-all">View All</a>
          </div>
          <div className="admin-home-orders-table">
            <div className="admin-home-order-row header">
              <div>Order ID</div>
              <div>Customer</div>
              <div>Date</div>
              <div>Amount</div>
              <div>Status</div>
            </div>
            
            {[1, 2, 3, 4, 5].map((order) => (
              <div className="admin-home-order-row" key={order}>
                <div>#ORD-{1000 + order}</div>
                <div>Customer {order}</div>
                <div>May {order}, 2023</div>
                <div>${(100 + order * 50).toFixed(2)}</div>
                <div>
                  <span className={`admin-home-status-badge ${order % 2 === 0 ? 'completed' : 'processing'}`}>
                    {order % 2 === 0 ? 'Completed' : 'Processing'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* <div className="admin-home-sales-chart">
          <div className="admin-home-section-header">
            <h2>Sales Overview</h2>
            <select className="admin-home-time-select">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
            </select>
          </div>
          <div className="admin-home-chart-container">
            <div className="admin-home-chart-placeholder">
              <svg viewBox="0 0 300 150" className="admin-home-chart-svg">
                <path d="M10,150 L50,120 L90,130 L130,80 L170,110 L210,60 L250,90 L290,40" 
                      stroke="#4CAF50" strokeWidth="2" fill="rgba(76, 175, 80, 0.1)"/>
                <path d="M10,150 L50,100 L90,140 L130,70 L170,120 L210,50 L250,100 L290,30" 
                      stroke="#2196F3" strokeWidth="2" fill="rgba(33, 150, 243, 0.1)"/>
              </svg>
            </div>
          </div>
        </div> */}
      </div>
      
      {/* Bottom Row */}
      <div className="admin-home-bottom-row">
        <div className="admin-home-top-products">
          <div className="admin-home-section-header">
            <h2>Top Products</h2>
          </div>
          <div className="admin-home-products-list">
            {[1, 2, 3].map((product) => (
              <div className="admin-home-product-item" key={product}>
                <div className="admin-home-product-rank">{product}</div>
                <div className="admin-home-product-image">
                  <img src={`https://picsum.photos/50/50?random=${product}`} alt={`Product ${product}`}/>
                </div>
                <div className="admin-home-product-info">
                  <div className="admin-home-product-name">Product {product}</div>
                  <div className="admin-home-product-sales">{20 + product * 5} sales</div>
                </div>
                <div className="admin-home-product-value">${(50 + product * 25).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="admin-home-recent-activity">
          <div className="admin-home-section-header">
            <h2>Recent Activity</h2>
          </div>
          <div className="admin-home-activity-list">
            {[1, 2, 3, 4].map((activity) => (
              <div className="admin-home-activity-item" key={activity}>
                <div className="admin-home-activity-icon">
                  {activity % 2 === 0 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  )}
                </div>
                <div className="admin-home-activity-details">
                  <div className="admin-home-activity-message">
                    {activity % 2 === 0 
                      ? `New order #ORD-${1000 + activity} received` 
                      : `Product ${activity} inventory low`}
                  </div>
                  <div className="admin-home-activity-time">{activity} hour{activity !== 1 ? 's' : ''} ago</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;