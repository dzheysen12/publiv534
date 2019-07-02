import API from './API.js';
var config = require('../../config.js');

class Services extends API {
  constructor(url) {
    super();
    if (url[url.length - 1] !== '/') {
      url += '/';
    }

    this.list = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'service/list';
      const auth = super.getAuthToken(data);

      if (super.checkError904(data, ['category'], errorCallback)) return;
      if (super.checkError901(auth, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.add = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'service/add';
      const auth = super.getAuthToken(data);

      const required = ['name', 'price'];

      if (super.checkError901(auth, errorCallback)) return;
      if (super.checkError902(data, required, errorCallback)) return;
      if (super.checkError904(data, ['category'], errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.edit = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'service/edit';
      const auth = super.getAuthToken(data);

      if (super.checkError901(auth, errorCallback)) return;
      if (super.checkError902(data, ['serviceid'], errorCallback)) return;
      if (super.checkError904(data, ['category', 'serviceid'], errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.delete = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'service/delete';
      const auth = super.getAuthToken(data);

      if (super.checkError901(auth, errorCallback)) return;
      if (super.checkError902(data, ['serviceid'], errorCallback)) return;
      if (super.checkError904(data, ['serviceid'], errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };
  }
}

export default new Services(config.Backend);