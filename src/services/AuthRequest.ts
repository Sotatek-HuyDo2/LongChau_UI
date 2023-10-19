import BaseRequest from './BaseRequest';
import config from 'src/config';

export default class AuthRequest extends BaseRequest {
  getUrlPrefix() {
    return config.api.baseUrlApi;
  }

  login(params: any) {
    const url = `v1/admin/auth/login`;
    return this.post(url, params);
  }
}
