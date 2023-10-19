import BaseRequest from './BaseRequest';
import config from 'src/config';

export default class MarketDataRequest extends BaseRequest {
  getUrlPrefix() {
    return config.api.baseUrlApi;
  }

  getAllCurrency() {
    const url = `v1/admin/marketdata/currencies`;
    return this.get(url);
  }

  getAllPair() {
    const url = `v1/admin/marketdata/pairs`;
    return this.get(url);
  }
}
