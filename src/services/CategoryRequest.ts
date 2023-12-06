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

  getAllCate() {
    const url = `categories`;
    return this.get(url);
  }

  getCateByID(categoryId: number) {
    const url = `categories/${categoryId}`;
    return this.get(url);
  }

  getDrugsTypeByCateID(categoryId: number) {
    const url = `categories/${categoryId}/drug-types`;
    return this.get(url);
  }
}
