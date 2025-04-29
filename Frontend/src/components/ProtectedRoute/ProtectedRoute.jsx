import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../components/AuthContext/AuthContext"; 

const ProtectedRoute = ({ children }) => {
    const { user } = useUser(); 

    return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
