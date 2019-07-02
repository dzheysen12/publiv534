import API from './API.js';
var config = require('../../config.js');

class Positions extends API {
  constructor(url) {
    super();
    if (url[url.length - 1] !== '/') {
      url += '/';
    }

    this.list = (data, successCallback, errorCallback) => {
      data = data || {};
  
      const endPoint = 'position/list';
      const auth = super.getAuthToken(data);

      if (super.checkError901(auth, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.add = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'position/add';
      const auth = super.getAuthToken(data);

      const required = ['name', 'services', 'schedule'];

      if (super.checkError901(auth, errorCallback)) return;
      if (super.checkError902(data, required, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.edit = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'position/edit';
      const auth = super.getAuthToken(data);

      if (super.checkError901(auth, errorCallback)) return;
      if (super.checkError902(data, ['positionid'], errorCallback)) return;
      if (super.checkError904(data, ['positionid'], errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.delete = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'position/delete';
      const auth = super.getAuthToken(data);

      if (super.checkError901(auth, errorCallback)) return;
      if (super.checkError902(data, ['positionid'], errorCallback)) return;
      if (super.checkError904(data, ['positionid'], errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };
  }
}

export default new Positions(config.Backend);