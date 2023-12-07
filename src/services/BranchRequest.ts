import BaseRequest from './BaseRequest';
import config from 'src/config';

export default class BranchRequest extends BaseRequest {
  getUrlPrefix() {
    return config.api.baseUrlApi;
  }

  createBranchAdmin(param: any) {
    const url = `branch/create`;
    return this.post(url, param);
  }

  getBranchList() {
    const url = `branch`;
    return this.get(url);
  }

  getBranchAdminDetail(id: number) {
    const url = `branch/${id}`;
    return this.get(url);
  }

  updateBranchAdminInfo(id: number, param: any) {
    const url = `branch/${id}`;
    return this.put(url, param);
  }
}
