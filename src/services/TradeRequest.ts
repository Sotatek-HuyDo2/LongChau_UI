import BaseRequest from './BaseRequest';
import config from 'src/config';

export default class TradeRequest extends BaseRequest {
  getUrlPrefix() {
    return config.api.baseUrlApi;
  }

  getTradingVolume(payload: any) {
    const url = `v1/admin/trades/trading-volume`;
    return this.get(url, payload);
  }
}
