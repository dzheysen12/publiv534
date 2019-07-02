import API from './API.js';
var config = require('../../config.js');

class Bots extends API {
  constructor(url) {
    super();
    if (url[url.length - 1] !== '/') {
      url += '/';
    }

    this.list = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'bot/list';
      const auth = super.getAuthToken(data);
      
      // if (super.checkError403()) return;
      // if (super.checkError901(auth, errorCallback)) return;
      // if (super.checkError902(data, errorCallback)) return;
      // if (super.checkError904(data, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.add = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'bot/add';
      let auth = super.getAuthToken(data);
      let required = ['name', 'description'];

      // if (super.checkError403(auth, errorCallback)) return;
      if (super.checkError901(auth, errorCallback)) return;
      if (super.checkError902(data, required, errorCallback)) return;
      // if (super.checkError904(data, required, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.edit = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'bot/edit';
      const auth = super.getAuthToken(data);
      let required = ['name', 'description', 'botid', 'employees'];

      // if (super.checkError403(auth, errorCallback)) return;
      // if (super.checkError901(auth, errorCallback)) return;
      // if (super.checkError902(data, required, errorCallback)) return;
      // if (super.checkError904(data, required, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.delete = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'bot/delete';
      const auth = super.getAuthToken(data);

    // if (super.checkError403(auth, errorCallback)) return;
    if (super.checkError901(auth, errorCallback)) return;
    if (super.checkError902(data, ['botid'], errorCallback)) return;
    if (super.checkError904(data, ['botid'], errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback)
    };

    this.sendMessage = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'webhook/send_message';
      const auth = super.getAuthToken(data);
      let required = ['text', 'botid'];
    
    if (super.checkError902(data, required, errorCallback)) return;
    if (super.checkError904(data, ['botid'], errorCallback)) return;
    // if (super.checkError906(data, ['botid'], errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback)
    };
    
  }
}

export default new Bots(config.Backend);
