import AuthRequest from './AuthRequest';
import UserRequest from './UserRequest';
import BranchAdminRequest from './BranchAdminRequest';
import SupplierRequest from './SupplierRequest';
import ProductRequest from './ProductRequest';

const requestMap = {
  AuthRequest,
  UserRequest,
  BranchAdminRequest,
  SupplierRequest,
  ProductRequest,
};

const instances = {};

export default class RequestFactory {
  static getRequest(classname: string) {
    // @ts-ignore
    const RequestClass = requestMap[classname];
    if (!RequestClass) {
      throw new Error(`Invalid request class name: ${classname}`);
    }

    // @ts-ignore
    let requestInstance = instances[classname];
    if (!requestInstance) {
      requestInstance = new RequestClass();
      // @ts-ignore
      instances[classname] = requestInstance;
    }

    return requestInstance;
  }
}
