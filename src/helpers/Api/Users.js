import $ from 'jquery';
import API from './API.js';
var config = require('../../config.js');

class Users extends API {
  constructor(url) {
    super();
    if (url[url.length - 1] !== '/') {
      url += '/';
    }

    this.list = (data, successCallback, errorCallback) => {
      data = data || {};
      var auth = super.getAuthToken(data);
      const endPoint = 'user/list';

      if (super.checkError904(data, ['entityid'], errorCallback)) return;
      if (super.checkError901(auth, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.session = (data, successCallback, errorCallback) => {
      data = data || {};

      if (super.checkError902(data, ['email', 'password'], errorCallback)) return;
      if (super.checkError907(data.email, errorCallback)) return;
      if (super.checkError908(data.password, errorCallback)) return;

      $.ajax({
        method: 'POST',
        url: url + 'user/session',
        data: data,
        success: (response, jqXHR) => {
          super.callBack(response, jqXHR, successCallback, errorCallback);
        }
      });
    };

    this.me = (data, successCallback, errorCallback) => {
      data = data || {};
      var auth = super.getAuthToken(data);
      const endPoint = 'user/me';

      if (super.checkError901(auth, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.register = (data, successCallback, errorCallback) => {
      data = data || {};
      var auth = super.getAuthToken(data);
      const endPoint = 'user/register';

      var required = ['email', 'password', 'usertype'];
      if (data.usertype === 'employee') {
        required.push('position');
      }
      if (super.checkError902(data, required , errorCallback)) return;
      if (super.checkError904(data, ['position'], errorCallback)) return;
      if (super.checkError907(data.email, errorCallback)) return;
      if (super.checkError908(data.password, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.edit = (data, successCallback, errorCallback) => {
      data = data || {};
      var auth = super.getAuthToken(data);
      const endPoint = 'user/edit';

      if (super.checkError901(auth, errorCallback)) return;
      if (data.email) {
        if (super.checkError907(data.email, errorCallback)) return;
      }
      if (data.password) {
        if (super.checkError908(data.password, errorCallback)) return;
      }

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.editEmployee = (data, successCallback, errorCallback) => {
      data = data || {};
      var auth = super.getAuthToken(data);
      const endPoint = 'user/edit_not_own_account';

      if (super.checkError901(auth, errorCallback)) return;
      if (data.email) {
        if (super.checkError907(data.email, errorCallback)) return;
      }
      if (data.password) {
        if (super.checkError908(data.password, errorCallback)) return;
      }

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.delete = (data, successCallback, errorCallback) => {
      data = data || {};
      var auth = super.getAuthToken(data);
      const endPoint = 'user/delete';

      if (super.checkError901(auth, errorCallback)) return;
      if (super.checkError904(data, ['userid'], errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.activate = (data, successCallback, errorCallback) => {
      data = data || {};
      var auth = super.getAuthToken(data);
      const endPoint = 'user/activate';

      if (super.checkError901(auth, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.lock = (data, successCallback, errorCallback) => {
      data = data || {};
      var auth = super.getAuthToken(data);
      const endPoint = 'user/lock';

      if (super.checkError902(data, ['userid'], errorCallback)) return;
      if (super.checkError904(data, ['userid'], errorCallback)) return;

      if (super.checkError901(auth, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.unlock = (data, successCallback, errorCallback) => {
      data = data || {};
      var auth = super.getAuthToken(data);
      const endPoint = 'user/unlock';

      if (super.checkError902(data, ['userid'], errorCallback)) return;
      if (super.checkError904(data, ['userid'], errorCallback)) return;

      if (super.checkError901(auth, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.email = (data, successCallback, errorCallback) => {
      data = data || {};
      var auth = super.getAuthToken(data);
      const endPoint = 'user/email';

     /* if (super.checkError902(data, ['userid', 'email'], errorCallback)) return;
      if (super.checkError904(data, ['userid'], errorCallback)) return;
      if (super.checkError907(data.email, errorCallback)) return;

      if (super.checkError901(auth, errorCallback)) return;*/

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };


    this.password = (data, successCallback, errorCallback) => {
      data = data || {};
      var auth = super.getAuthToken(data);
      const endPoint = 'user/password';

    /*  if (super.checkError902(data, ['userid', 'password'], errorCallback)) return;
      if (super.checkError904(data, ['userid'], errorCallback)) return;
      if (super.checkError908(data.password, errorCallback)) return;

      if (super.checkError901(auth, errorCallback)) return;*/

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    };

    this.request = (data, successCallback, errorCallback) => {
      data = data || {};

  /*    if (super.checkError902(data, ['email'], errorCallback)) return;
      if (super.checkError907(data.email, errorCallback)) return;*/

      $.ajax({
        method: 'POST',
        url: url + 'user/request',
        data: data,
        success: (response, jqXHR) => {
          super.callBack(response, jqXHR, successCallback, errorCallback);
        }
      });
    };

    this.restore = (data, successCallback, errorCallback) => {
      data = data || {};

      if (super.checkError902(data, ['code', 'password'], errorCallback)) return;
      if (super.checkError908(data.password, errorCallback)) return;

      $.ajax({
        method: 'POST',
        url: url + 'user/restore',
        data: data,
        success: (response, jqXHR) => {
          super.callBack(response, jqXHR, successCallback, errorCallback);
        }
      });
    };

    this.view = (data, successCallback, errorCallback) => {
      data = data || {};
      var auth = super.getAuthToken(data);
      const endPoint = 'user/list';

      if (super.checkError902(data, ['userid'], errorCallback)) return;
      if (super.checkError904(data, ['userid'], errorCallback)) return;

      if (super.checkError901(auth, errorCallback)) return;

      super.makeRequest(data, endPoint, url, auth, successCallback, errorCallback);
    }
  }
}

export default new Users(config.Backend);
