import BaseRequest from './BaseRequest';
import config from 'src/config';

export default class RackRequest extends BaseRequest {
  getUrlPrefix() {
    return config.api.baseUrlApi;
  }

  getTotalRack() {
    const url = `rack/total`;
    return this.get(url);
  }

  addDrugsToRack(param: any) {
    const url = `rack/add-drugs`;
    return this.put(url, param);
  }

  updateSizeTotalRack(param: any) {
    const url = `rack/total`;
    return this.put(url, param);
  }

  //   getBranchRack() {
  //     const url = `rack/branch`;
  //     return this.get(url);
  //   }
}
