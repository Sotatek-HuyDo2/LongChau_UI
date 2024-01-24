import BaseRequest from './BaseRequest';
import config from 'src/config';

export default class OrderRequest extends BaseRequest {
  getUrlPrefix() {
    return config.api.baseUrlApi;
  }

  createdOrder(params: any) {
    const url = `order/create`;
    return this.post(url, params);
  }

  getCreatedOrder() {
    const url = `order/created-orders`;
    return this.get(url);
  }

  getApprovedOrder() {
    const url = `order/approved-orders`;
    return this.get(url);
  }

  getDeliveredOrder() {
    const url = `order/delivered-orders`;
    return this.get(url);
  }

  getDoneOrder() {
    const url = `order/done-orders`;
    return this.get(url);
  }

  getRejectedOrder() {
    const url = `order/rejected-orders`;
    return this.get(url);
  }

  getOrderById(id: number) {
    const url = `order/${id}`;
    return this.get(url);
  }

  changeStatusOrder(id: number, param: any) {
    const url = `order/${id}`;
    return this.put(url, param);
  }

  createOrderSplit(id: number, param: any) {
    const url = `order/${id}/split`;
    return this.post(url, param);
  }

  createOrderServe(id: number, param: any) {
    const url = `order/${id}/serve`;
    return this.post(url, param);
  }
}
