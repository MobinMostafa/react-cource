import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const isLoggedOut = useSelector((state) => state.users.isLoggedOut);
    const user = useSelector((state) => state.users.user);

    if (isLoggedOut || !user) {
        return <Navigate to="/auth/login" replace />;
    }

  return children;
}

export default PrivateRoute