import React from 'react';
import { Navigate, Outlet } from 'react-router';
import Storage from 'src/utils/storage';

interface PrivateRouteProps {
  allowedRoles: string[];
  redirectTo?: string;
}

const PrivateRoute = ({
  allowedRoles,
  redirectTo = '/login',
}: PrivateRouteProps) => {
  const role = Storage.getRole();

  if (!!role && allowedRoles.includes(role)) {
    return <Outlet />;
  } else {
    return <Navigate to={redirectTo} />;
  }
};

// const PrivateRoute = ({ allowedRoles, redirectTo = '/' }) => {
//   const role = Storage.getRole();

//   if (!!role && allowedRoles.includes(role)) {
//     return <Outlet />;
//   } else {
//     return <Navigate to={redirectTo} />;
//   }
// };

export default PrivateRoute;
