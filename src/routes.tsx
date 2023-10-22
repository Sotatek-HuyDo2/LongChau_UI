import { useEffect } from 'react';
import { toastError } from './utils/notify';
import { toast } from 'react-toastify';
import { Route, Routes } from 'react-router';
import LoginPage from '../src/pages/LoginPage';
import DashboardPage from '../src/pages/DashboardPage';
import React from 'react';
import { PrivateRoute } from 'src/components';
import ListingPage from './pages/ListingPage';
import UserManagement from './pages/UserManagement';
import UserInformationDetail from './pages/UserInfoDetail';
import MarketingPage from './pages/MarketingPage';
import InsightPage from './pages/InsightPage';
import CreatePushNotificationPage from './pages/CreatePushNotificationPage';
import CreateNotificationPage from './pages/CreateNotificationPage';
import { useEffectUnsafe } from './hooks/useEffectUnsafe';
import { initMetadata } from './store/metadata';
import { useDispatch } from 'react-redux';
import Storage from './utils/storage';
import MedicalManagementPage from './pages/Admin/MedicalManagementPage';
import MedicalDetailPage from './pages/MedicalDetailPage';
import ManageCategoryList from './pages/Admin/ManageCategoryListPage';

/**
 * Main App routes.
 */
const RouterCustom = () => {
  const dispatch = useDispatch();
  const accessToken = Storage.getAccessToken();

  useEffectUnsafe(() => {
    if (accessToken) {
      dispatch(initMetadata());
    }
  }, [accessToken]);

  useEffect(() => {
    const offlineEvent = () => {
      toastError('toast.offline-message', {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        pauseOnHover: false,
      });
    };

    const onlineEvent = () => {
      toast.dismiss();
    };
    window.addEventListener('offline', offlineEvent);
    window.addEventListener('online', onlineEvent);
    return () => {
      window.removeEventListener('offline', offlineEvent);
      window.removeEventListener('online', onlineEvent);
    };
  }, []);

  return (
    <Routes>
      {/* <Route path={'/'} element={<PrivateRoute />}>
        <Route index element={<DashboardPage />} />
      </Route>


      <Route path={'/delist'} element={<PrivateRoute />}>
        <Route index element={<DelistPage />} />
      </Route>

      <Route path={'/listing'} element={<PrivateRoute />}>
        <Route index element={<ListingPage />} />
      </Route>

      <Route path={'/user'} element={<PrivateRoute />}>
        <Route index element={<UserManagement />} />
      </Route>

      <Route path={'/user/:uid'} element={<PrivateRoute />}>
        <Route index element={<UserInformationDetail />} />
      </Route>

      <Route path={'/marketing'} element={<PrivateRoute />}>
        <Route index element={<MarketingPage />} />
      </Route>

      <Route path={'/create-push-notification'} element={<PrivateRoute />}>
        <Route index element={<CreatePushNotificationPage />} />
      </Route>

      <Route path={'/create-notification'} element={<PrivateRoute />}>
        <Route index element={<CreateNotificationPage />} />
      </Route>

      <Route path={'/insight'} element={<PrivateRoute />}>
        <Route index element={<InsightPage />} />
      </Route> */}
      <Route path={'/login'} element={<LoginPage />} />

      <Route path={'/'} element={<DashboardPage />} />
      <Route
        path={'/medication-management'}
        element={<MedicalManagementPage />}
      />
      <Route path={'/medical/:id'} element={<MedicalDetailPage />} />
      <Route path={'/manage-category'} element={<ManageCategoryList />} />
    </Routes>
  );
};

export default RouterCustom;
