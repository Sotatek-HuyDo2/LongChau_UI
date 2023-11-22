import BaseRequest from './BaseRequest';
import config from 'src/config';

export default class ProductRequest extends BaseRequest {
  getUrlPrefix() {
    return config.api.baseUrlApi;
  }

  // createProduct(param: any) {
  //   const url = `/product/create`;
  //   return this.post(url, param);
  // }

  // getProduct() {
  //   const url = `/product`;
  //   return this.get(url);
  // }

  // getProductDetail(id: number) {
  //   const url = `/product/${id}`;
  //   return this.get(url);
  // }

  // getProductByCateID(cate_id: number) {
  //   const url = `/product/category/${cate_id}`;
  //   return this.get(url);
  // }

  // getProductByProductTypeID(pro_type_id: number) {
  //   const url = `/product/product-type/${pro_type_id}`;
  //   return this.get(url);
  // }

  // deleteProduct(id: number) {
  //   const url = `product/${id}`;
  //   return this.delete(url);
  // }

  // updateProductInfo(param: any, id: number) {
  //   const url = `/product/${id}`;
  //   return this.put(url, param);
  // }
}
