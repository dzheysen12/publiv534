import API from './API.js';
var config = require('../../config.js');

class Category extends API {
  constructor(url) {
    super();
    if (url[url.length - 1] !== '/') {
      url += '/';
    }

    this.list = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'category/list';
      const auth = super.getAuthToken(data);

      if (super.checkError901(auth, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.add = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'category/add';
      const auth = super.getAuthToken(data);

      if (super.checkError901(auth, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.edit = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'category/edit';
      const auth = super.getAuthToken(data);

      if (super.checkError901(auth, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.delete = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'category/delete';
      const auth = super.getAuthToken(data);

      if (super.checkError901(auth, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };
  }
}

export default new Category(config.Backend);
