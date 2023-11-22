import BaseRequest from './BaseRequest';
import config from 'src/config';

export default class BranchAdminRequest extends BaseRequest {
  getUrlPrefix() {
    return config.api.baseUrlApi;
  }

  //   createBranchAdmin(param: any) {
  //     const url = `/branch/create`;
  //     return this.post(url, param);
  //   }

  //   getBranchAdmin() {
  //     const url = `/branch`;
  //     return this.get(url);
  //   }

  //   getBranchAdminDetail(id: number) {
  //     const url = `/branch${id}`;
  //     return this.get(url);
  //   }

  //   updateBranchAdminInfo(param: any, id: number) {
  //     const url = `/branch/{id}`;
  //     return this.put(url, param);
  //   }
}
