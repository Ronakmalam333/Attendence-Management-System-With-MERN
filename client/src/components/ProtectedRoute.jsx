import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ role, children }) => {
  const { user, token, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || !token || user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;