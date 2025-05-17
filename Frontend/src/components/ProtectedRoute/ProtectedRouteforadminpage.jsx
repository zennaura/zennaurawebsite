import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../AuthContext/AuthContext';
import React from 'react';

const ProtectedRouteforadminpage = ({ children, requiredRole = 'admin' }) => {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.userRole !== requiredRole) {
    return (
      <div className="access-denied">
        <h2>Access Denied</h2>
        <p>You don't have administrator privileges to view this page.</p>
        <Navigate to="/" replace />
      </div>
    );
  }

  return children;
};

export default ProtectedRouteforadminpage;