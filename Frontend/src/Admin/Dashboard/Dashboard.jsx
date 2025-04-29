import React from 'react';
import './Dashboard.css';

import AdminNavbar from '../AdminNavbar/AdminNavbar'
import Homepage from '../Homepage/Homepage.jsx'

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">

            <div className="left-container">
                <AdminNavbar/>
            </div>
            <div className="right-container">
                <Homepage/>
            </div>
        </div>
    );
};

export default AdminDashboard;