import API from './API.js';
var config = require('../../config.js');

class Orders extends API {
  constructor(url) {
    super();
    if (url[url.length - 1] !== '/') {
      url += '/';
    }

    this.list = (data, successCallback, errorCallback) => {
      data = data || {};
      let auth = super.getAuthToken(data);
      const endPoint = 'crmorder/list';

      if (super.checkError901(auth, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.add = (data, successCallback, errorCallback) => {
      data = data || {};
      let auth = super.getAuthToken(data);
      const endPoint = 'crmorder/add';
      // let required = ['name', 'time', 'contacts', 'service'];

            // if (super.checkError403()) return;
      // if (super.checkError901(auth, errorCallback)) return;
      // if (super.checkError902(data, required, errorCallback)) return;
      // if (super.checkError904(data, required, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);

    };

    this.edit = (data, successCallback, errorCallback) => {
      data = data || {};
      let auth = super.getAuthToken(data);
      const endPoint = 'crmorder/edit';
      let required = ['crm_orderid', 'time', 'contacts', 'service'];

      // if (super.checkError901(auth, errorCallback)) return;
      if (super.checkError902(data, required, errorCallback)) return;
      // if (super.checkError904(data, required, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.delete = (data, successCallback, errorCallback) => {
      data = data || {};
      let auth = super.getAuthToken(data);
      const endPoint = 'crmorder/delete';
      let required = ['crm_orderid'];

      if (super.checkError901(auth, errorCallback)) return;
      if (super.checkError904(data, required, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };
  }
}

export default new Orders(config.Backend);
