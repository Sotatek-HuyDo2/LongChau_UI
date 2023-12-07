import BaseRequest from './BaseRequest';
import config from 'src/config';

export default class SupplierRequest extends BaseRequest {
  getUrlPrefix() {
    return config.api.baseUrlApi;
  }

  createSupplier(param: any) {
    const url = `supplier/create`;
    return this.post(url, param);
  }

  getSupplier() {
    const url = `supplier`;
    return this.get(url);
  }

  getSupplierDetail(id: number) {
    const url = `supplier/${id}`;
    return this.get(url);
  }

  updateSupplier(param: any, id: number) {
    const url = `supplier/${id}`;
    return this.put(url, param);
  }
}
