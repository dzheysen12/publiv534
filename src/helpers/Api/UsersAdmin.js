import API from './API.js';
var config = require('../../config.js');

class UsersAdmin extends API {
  constructor(url) {
    super();
    if (url[url.length - 1] !== '/') {
      url += '/';
    }

    this.list = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'user/list';
      let auth = super.getAuthToken(data);

      if (super.checkError904(data, ['entityid'], errorCallback)) return;
      if (super.checkError901(auth, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.delete = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'user/delete';
      const auth = super.getAuthToken(data);

      if (super.checkError901(auth, errorCallback)) return;
      if (super.checkError902(data, ['userid'], errorCallback)) return;
      if (super.checkError904(data, ['userid'], errorCallback)) return;
      // if (super.checkError906(data, ['userid'], errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.edit = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'user/edit_by_admin';
      const auth = super.getAuthToken(data);

      if (super.checkError901(auth, errorCallback)) return;
      if (super.checkError902(data, ['userid'], errorCallback)) return;
      if (super.checkError904(data, ['userid'], errorCallback)) return;
      // if (super.checkError906(data, ['userid'], errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.view = (data, successCallback, errorCallback) => {
      data = data || {};
      const endPoint = 'user/view';
      const auth = super.getAuthToken(data);

      if (super.checkError901(auth, errorCallback)) return;
      if (super.checkError902(data, ['userid'], errorCallback)) return;
      if (super.checkError904(data, ['userid'], errorCallback)) return;
      // if (super.checkError906(data, ['userid'], errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };
  };
}

export default new UsersAdmin(config.Backend);
