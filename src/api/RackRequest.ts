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

  getRackBranch() {
    const url = `rack/branch-warehouse`;
    return this.get(url);
  }

  getMyRackBranch() {
    const url = `rack/my-branch/branch-warehouse`;
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

  updateCapacityBranchWareHouse(param: any) {
    const url = `rack/branch-warehouse`;
    return this.put(url, param);
  }

  createBranchWareHouse(branchId: number | string, param: any) {
    const url = `rack/branch-warehouse/${branchId}`;
    return this.post(url, param);
  }

  deleteDrugsFromRack(param: any) {
    const url = `rack/remove-drugs`;
    return this.put(url, param);
  }

  deleteDrugsFromBranchWareHouse(param: any) {
    const url = `rack/my-branch/remove-drugs`;
    return this.put(url, param);
  }
}
