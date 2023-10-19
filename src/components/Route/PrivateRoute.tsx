import React from 'react';
import { Navigate, Outlet } from 'react-router';
import Storage from 'src/utils/storage';

const PrivateRoute = () => {
  const accessToken = Storage.getAccessToken();
  if (!!accessToken) {
    return <Outlet />;
  } else {
    return <Navigate to={'/login'} />;
  }
};
export default PrivateRoute;
