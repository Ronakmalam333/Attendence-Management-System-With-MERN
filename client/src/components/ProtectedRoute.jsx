import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ role, children }) => {
  const { user, token, isLoading } = useContext(AuthContext);

  // If still loading, don't redirect yet
  if (isLoading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  // Redirect to login if no user or token, or if role doesn't match
  if (!user || !token || user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;