import API from './API.js';
var config = require('../../config.js');

class Settings extends API {
  constructor(url) {
    super();
    if (url[url.length - 1] !== '/') {
      url += '/';
    }

    this.list = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'settings/list';
      const auth = super.getAuthToken(data);

      if (super.checkError901(auth, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.get = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'settings/add';
      const auth = super.getAuthToken(data);

      const required = ['name'];

      if (super.checkError901(auth, errorCallback)) return;
      if (super.checkError902(data, required, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };



  }
}

export default new Settings(config.Backend);
