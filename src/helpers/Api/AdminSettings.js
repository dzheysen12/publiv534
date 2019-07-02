import $ from 'jquery';
import API from './API.js';
var config = require('../../config.js');

class AdminSetting extends API {
  constructor(url) {
    super();
    if (url[url.length - 1] !== '/') {
      url += '/';
    }

    this.list = (data, successCallback, errorCallback) => {
      data = data || {};
      const auth = super.getAuthToken(data);

      $.ajax({
        method: 'POST',
        url: url + 'settings/list',
        headers: {
          'Authorization': 'JWT ' + auth
        },
        data: data,
        success: (response, jqXHR) => {
          super.callBack(response, jqXHR, successCallback, errorCallback);
        }
      });
    };


    this.edit = (data, successCallback, errorCallback) => {
      data = data || {};
      const auth = super.getAuthToken(data);

      $.ajax({
        method: 'POST',
        url: url + 'settings/edit',
        headers: {
          'Authorization': 'JWT ' + auth
        },
        data: data,
        success: (response, jqXHR) => {
          super.callBack(response, jqXHR, successCallback, errorCallback);
        }
      });
    };


  }
}

export default new AdminSetting(config.Backend);
