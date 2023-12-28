import { useEffect } from 'react';
import { toastError } from './utils/notify';
import { toast } from 'react-toastify';
import { Route, Routes } from 'react-router';
import LoginPage from '../src/pages/LoginPage';
import { PrivateRoute } from 'src/components';
import { useEffectUnsafe } from './hooks/useEffectUnsafe';
import { initMetadata } from './store/metadata';
import { useDispatch } from 'react-redux';
import Storage from './utils/storage';
import MedicalManagementPage from './pages/Admin/MedicalManagementPage';
import MedicalDetailPage from './pages/MedicalDetailPage';
import ManageCategoryList from './pages/Admin/ManageCategoryListPage';
import GeneralWarehouseManagementPage from './pages/Admin/GeneralWarehouseManagementPage';
import BranchManagementPage from './pages/Admin/BranchManagementPage';
import SupplierManagementPage from './pages/Admin/SupplierManagementPage';
import Statistical from './pages/Admin/Statistical';
import HomePage from './pages/HomePage';
import PharmacySystemPage from './pages/PharmacySystemPage';
import CategoryFunctionalFoodsPage from './pages/CategoryFunctionalFoodsPage';
import CategoryMedicinePage from './pages/CategoryMedicinePage';
import BranchAdminGeneralWarehouseManagementPage from './pages/Branch-Admin/GeneralWarehouseManagementPage';
import StaffCustomerManagementPage from './pages/Staff/UserManagementPage';
import BranchAdminPersonnelManagementPage from './pages/Branch-Admin/PersonnelManagementPage';
import ProfilePart from './pages/UserProfilePage/Profile';
import Order from './pages/Order';
import RegisterPage from './pages/RegisterPage';
import ProfileEditPart from './pages/UserProfilePage/EditProfile';
import CustomerManagementPage from './pages/Admin/UserManagementPage/CustomerManagementPage';
import UserManagerList from './pages/Admin/UserManagementPage';
import TotalRackManagementPage from './pages/Admin/TotalRackManagementPage';

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
      <Route path={'/login'} element={<LoginPage />} />

      <Route path={'/register'} element={<RegisterPage />} />

      {/* Customer */}
      <Route path={'/'} element={<PrivateRoute allowedRoles={['customer']} />}>
        <Route index element={<HomePage />} />

        <Route path={'pharmacy-system'} element={<PharmacySystemPage />} />

        <Route
          path={'phan-loai/:categorySlug/:typeSlug'}
          element={<CategoryFunctionalFoodsPage />}
        />

        <Route
          path={'phan-loai/:categorySlug'}
          element={<CategoryFunctionalFoodsPage />}
        />

        <Route path={'category-medicine'} element={<CategoryMedicinePage />} />

        <Route path={'profile'} element={<ProfilePart />} />

        <Route path={'profile/edit'} element={<ProfileEditPart />} />

        <Route path={'order'} element={<Order />} />

        {/* <Route
          path={'admin/category-management/category-functional-foods'}
          element={<CategoryFunctionalFoods />}
        /> */}
      </Route>

      <Route element={<PrivateRoute allowedRoles={['customer', 'admin']} />}>
        <Route path={'medical/:id'} element={<MedicalDetailPage />} />
      </Route>

      {/* Staff */}
      <Route
        path={'/staff'}
        element={<PrivateRoute allowedRoles={['staff']} />}
      >
        <Route index element={<StaffCustomerManagementPage />} />

        <Route
          path={'general-warehouse-management'}
          element={<GeneralWarehouseManagementPage />}
        />
      </Route>

      {/* Branch-Admin */}
      <Route
        path={'/branch-admin'}
        element={<PrivateRoute allowedRoles={['branch_admin']} />}
      >
        <Route index element={<BranchAdminGeneralWarehouseManagementPage />} />

        <Route
          path={'personnel-management'}
          element={<BranchAdminPersonnelManagementPage />}
        />

        <Route path={'statistical'} element={<Statistical />} />
      </Route>

      {/* Admin */}
      <Route path={'admin'} element={<PrivateRoute allowedRoles={['admin']} />}>
        <Route index element={<SupplierManagementPage />} />

        <Route path={'category-management'} element={<ManageCategoryList />} />
        <Route path={'branch-management'} element={<BranchManagementPage />} />

        <Route
          path={'medication-management'}
          element={<MedicalManagementPage />}
        />

        <Route
          path={'customer-management'}
          element={<CustomerManagementPage />}
        />

        <Route path={'user-management'} element={<UserManagerList />} />

        <Route
          path={'total-rack-management'}
          element={<TotalRackManagementPage />}
        />
        {/* <Route
          path={'general-warehouse-management'}
          element={<GeneralWarehouseManagementPage />}
        /> */}

        <Route path={'statistical'} element={<Statistical />} />
      </Route>

      {/* 
        <Route path={'admin'} element={<SupplierManagementPage />} />
      <Route
        path={'admin/category-management/category-functional-foods'}
        element={<CategoryFunctionalFoods />}
      />

      <Route
        path={'admin/category-management/category-medicine'}
        element={<CategoryMedicine />}
      />

      <Route
        path={'admin/category-management/category-personal-care'}
        element={<CategoryPersonalCare />}
      />

      <Route
        path={'admin/category-management/category-medical-equipment'}
        element={<CategoryMedicalEquipment />}
      /> */}

      {/* <Route
        path={'admin/general-warehouse-management'}
        element={<GeneralWarehouseManagementPage />}
      /> */}
    </Routes>
  );
};

export default RouterCustom;
