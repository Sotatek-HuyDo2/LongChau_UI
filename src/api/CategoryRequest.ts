import BaseRequest from './BaseRequest';
import config from 'src/config';

export default class CategoryRequest extends BaseRequest {
  getUrlPrefix() {
    return config.api.baseUrlApi;
  }

  getAllCate() {
    const url = `categories`;
    return this.get(url);
  }

  getCateByID(categoryId: number) {
    const url = `categories/${categoryId}`;
    return this.get(url);
  }

  getAllDrugsTypeByCateID(categoryId: number) {
    const url = `categories/${categoryId}/drug-types`;
    return this.get(url);
  }

  // TYPE PRODUCT
  createDrugsTypeByCate(param: any) {
    const url = `categories/drug-types/create`;
    return this.post(url, param);
  }

  updateDrugsTypeByCate(categoryId: number, id: number, param: any) {
    const url = `categories/${categoryId}/drug-types/${id}`;
    return this.put(url, param);
  }

  getDrugsTypeByCateID(id: number) {
    const url = `categories/drug-types/${id}`;
    return this.get(url);
  }

  deleteDrugsTypeByID(id: number) {
    const url = `categories/drug-types/${id}`;
    return this.delete(url);
  }
}
