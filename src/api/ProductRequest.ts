import BaseRequest from './BaseRequest';
import config from 'src/config';

export default class ProductRequest extends BaseRequest {
  getUrlPrefix() {
    return config.api.baseUrlApi;
  }

  createProduct(param: any) {
    const url = `drugs/create`;
    return this.post(url, param);
  }

  getProduct() {
    const url = `drugs`;
    return this.get(url);
  }

  getProductDetail(id: number) {
    const url = `drugs/${id}`;
    return this.get(url);
  }

  getDrugsByCateID(cate_id: number) {
    const url = `drugs/category/${cate_id}`;
    return this.get(url);
  }

  getAllDrugsByTypeID(drugsType_id: number) {
    const url = `drugs/drugs-type/${drugsType_id}`;
    return this.get(url);
  }

  deleteProduct(id: number) {
    const url = `drugs/${id}`;
    return this.delete(url);
  }

  updateProductInfo(id: number, param: any) {
    const url = `drugs/${id}`;
    return this.put(url, param);
  }
}
