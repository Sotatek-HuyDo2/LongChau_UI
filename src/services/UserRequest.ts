import BaseRequest from './BaseRequest';
import config from 'src/config';

export default class UserRequest extends BaseRequest {
  getUrlPrefix() {
    return config.api.baseUrlApi;
  }

  //   register(params: any) {
  //     const url = `/user-public/register`;
  //     return this.post(url, params);
  //   }

  //   branchAdminRegister(params: any) {
  //     const url = `/user/branch-admin`;
  //     return this.post(url, params);
  //   }

  //   staffRegister(params: any) {
  //     const url = `/user/staff`;
  //     return this.post(url, params);
  //   }

  getUser() {
    const url = `user`;
    return this.get(url);
  }

  //   getBranchAdmin() {
  //     const url = `/user/branch-admin`;
  //     return this.get(url);
  //   }

  getProfile() {
    const url = `user/profile`;
    return this.get(url);
  }

  //   updateProfile(param: any) {
  //     const url = `/user/profile`;
  //     return this.put(url, param);
  //   }

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
}
