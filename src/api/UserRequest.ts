import BaseRequest from './BaseRequest';
import config from 'src/config';

export default class UserRequest extends BaseRequest {
  getUrlPrefix() {
    return config.api.baseUrlApi;
  }

  // user
  register(params: any) {
    const url = `user-public/register`;
    return this.post(url, params);
  }

  getProfile() {
    const url = `user/profile`;
    return this.get(url);
  }

  updateProfile(param: any) {
    const url = `user/profile`;
    return this.put(url, param);
  }

  deleteUser(id: number) {
    const url = `user/${id}`;
    return this.delete(url);
  }

  activeUser(id: number) {
    const url = `user/activate/${id}`;
    return this.put(url);
  }

  deActiveUser(id: number) {
    const url = `user/deactivate/${id}`;
    return this.put(url);
  }

  createBranchAdminAccount(params: any) {
    const url = `user/branch-admin`;
    return this.post(url, params);
  }

  createStaffAccount(params: any) {
    const url = `user/staff`;
    return this.post(url, params);
  }

  getStaff() {
    const url = `user/staff`;
    return this.get(url);
  }

  getStaffByID(id: number | string) {
    const url = `user/staff/${id}`;
    return this.get(url);
  }

  getBranchAdmin() {
    const url = `user/branch-admin`;
    return this.get(url);
  }

  getBranchAdminByID(id: number | string) {
    const url = `user/branch-admin/${id}`;
    return this.get(url);
  }

  getCustomer() {
    const url = `user/customer`;
    return this.get(url);
  }

  getCustomerByID(id: number | string) {
    const url = `user/customer/${id}`;
    return this.get(url);
  }
}
