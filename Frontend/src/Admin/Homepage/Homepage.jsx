import React from 'react';
import './Homepage.css';
import { useUser } from '../../components/AuthContext/AuthContext'

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
      </div>

    </div>
  );
};

export default Home;