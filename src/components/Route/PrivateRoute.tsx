import React from 'react';
import { Navigate, Outlet } from 'react-router';
import Storage from 'src/utils/storage';

const PrivateRoute = () => {
  const role = Storage.getRole();

  if (!!role && role === 'admin') {
    return <Outlet />;
  } else {
    return <Navigate to={'/'} />;
  }
};

export default PrivateRoute;
