import React, { useState, useEffect } from "react";
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import './ViewAllUsers.css';
import axios from 'axios';
import {useUser} from '../../components/AuthContext/AuthContext'


const ViewAllUsers = () => {
    const { user } = useUser();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_LINK}/api/userdashboard/fetchalluser`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return format(new Date(dateString), 'MMM dd, yyyy');
        } catch {
            return 'Invalid date';
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
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
    return (
        <div className="ViewAllUsers-maincontainer">
            <div className="ViewAllUsers-leftcontainer">
                <AdminNavbar />
            </div>
            <div className="ViewAllUsers-rightcontainer">
                <h2>All Users</h2>
                {loading ? (
                    <div className="loading-spinner">Loading...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <div className="users-table-container">
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Gender</th>
                                    <th>Date of Birth</th>
                                    <th>Role</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.firstName} {user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.gender || 'N/A'}</td>
                                        <td>{formatDate(user.dateOfBirth)}</td>
                                        <td>{user.userRole}</td>
                                        <td>{user.Points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewAllUsers;