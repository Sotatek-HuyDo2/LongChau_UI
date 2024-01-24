import BaseRequest from './BaseRequest';
import config from 'src/config';

export default class InsightRequest extends BaseRequest {
  getUrlPrefix() {
    return config.api.baseUrlApi;
  }

  insightIsBranchAdmin() {
    const url = 'insight/my-branch/orders';
    return this.get(url);
  }

  insightIsAdmin() {
    const url = 'insight/branches/sales';
    return this.get(url);
  }
}
