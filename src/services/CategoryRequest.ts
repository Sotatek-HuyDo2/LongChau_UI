import BaseRequest from './BaseRequest';
import config from 'src/config';

export default class CategoryRequest extends BaseRequest {
  getUrlPrefix() {
    return config.api.baseUrlApi;
  }

  // createProduct(param: any) {
  //   const url = `/product/create`;
  //   return this.post(url, param);
  // }

  getAllCate(id: number) {
    const url = `categories/${id}`;
    return this.get(url);
  }
}
