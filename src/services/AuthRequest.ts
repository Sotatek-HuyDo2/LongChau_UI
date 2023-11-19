import axios from 'axios';
import BaseRequest from './BaseRequest';
import config from 'src/config';

export default class AuthRequest extends BaseRequest {
  getUrlPrefix() {
    return config.api.baseUrlApi;
  }

  // login(body: any) {
  //   const url = `user-public/login`;
  //   return axios({
  //     method: 'post',
  //     url: `${this.getUrlPrefix()}${url}`,
  //     data: body,
  //   });
  // }

  login(body: any) {
    const url = `user-public/login`;
    return this.post(url, body);
  }

  async getDemo(param: any) {
    const url = `https://pharmacy-management-api.up.railway.app/product-public`;
    return await axios.get(url, param);
  }
}
