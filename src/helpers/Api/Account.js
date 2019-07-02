import API from './API.js';
var config = require('../../config.js');

class Account extends API {
    constructor(url) {
      super();
      if (url[url.length - 1] !== '/') {
        url += '/';
      }

      this.me = (data, successCallback, errorCallback) => {
        data = data || {};
        const endPoint = 'user/me';
        var auth = super.getAuthToken(data);
        console.log(auth)

        if (super.checkError901(auth, errorCallback)) return;

        super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
      };

      this.list = (data, successCallback, errorCallback) => {
        data = data || {};
        const endPoint = 'settings/list';
        var auth = super.getAuthToken(data);

        super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
      };


    }

}

export default new Account(config.Backend);

