import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function PrivateRoute({ children }) {
  const { user,loading  } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(user);
  if (!user || !user.isAdmin) {
    return <Navigate to="/admin/login" />;
  }

  return children;
}

export default PrivateRoute;