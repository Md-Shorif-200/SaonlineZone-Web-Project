import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useRole from '../Hooks/useRole';

const UserRoute = ({ children}) => {
  const { role, loading, error } = useRole();
  const location = useLocation();

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Checking permissions...</p>
      </div>
    );
  }

  // Error handling (optional)
  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  // Role check
  if (role === 'user') {
    return children;
  }

  // Not authorized → Redirect to login
  // return <Navigate to="/" state={{ from: location }} replace />;
};

export default UserRoute;
