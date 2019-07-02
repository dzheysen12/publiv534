import Cookies from 'universal-cookie';
import $ from 'jquery';

const cookies = new Cookies();
var config = require('../../config.js');

class API {
  constructor() {
    this.errors = {
      /*
      e403: 'Forbidden',
      e901: 'Authentication is over',
      e902: 'Required fields are not provided',
      e903: 'Data is used',
      e904: 'One or more fields have incorrect data',
      e905: 'Email-password pair is not exist or you are not confirmed your account',
      e906: 'Data is not found',
      e907: 'Email is incorrect',
      e908: 'Password is incorrect'
      */
      e403: 'У вас недостаточно прав для данного действия',
      e901: 'Аутентификация не пройдена',
      e902: 'Необходимые данные не были предоставлены',
      e903: 'Эти данные уже используются',
      e904: 'Некорректные данные',
      e905: 'Неверный пароль или email',
      e906: 'Данные не найдены',
      e907: 'Некорректный email',
      e908: 'Некорректный пароль'
    };
  }

  makeRequest(data, endPoint, url, auth, successCallback, errorCallback) {
    $.ajax({
      method: 'POST',
      url: url + endPoint,
      headers: {
        'Authorization': 'JWT ' + auth
      },
      data: data,
      success: (response, jqXHR) => {
        this.callBack(response, jqXHR, successCallback, errorCallback);
      }
    });
  }

  getAuthToken(data) {
    var auth = data.auth || cookies.get('auth');
    delete data.auth;
    return auth;
  }

  callBack(response, jqXHR, successCallback, errorCallback) {
    if (response.status !== 200) {
      if (typeof errorCallback === 'function') {
        errorCallback(response.status, this.errors['e' + response.status]);
      } else if (config.debug) {
        console.log(response);
        alert(this.errors['e' + response.status]);
      }
    } else {
      if (typeof successCallback === 'function') {
        successCallback(response.data);
      }
    }
  }

  checkError901(dataToCheck, errorCallback) {
    if (!dataToCheck) {
      if (typeof errorCallback === 'function') {
        errorCallback(901, this.errors.e901);
      } else if (config.debug) {
        alert(this.errors.e901);
      }
      return true;
    }
    return false;
  }

  checkError902(dataToCheck, required_fields, errorCallback) {
    if (config.debug) {
      console.log(dataToCheck);
      console.log(required_fields)
    }

    var error = false;
    try {
      required_fields.forEach((required_field) => {
        var param = dataToCheck[required_field];
        if (typeof param === 'undefined' || (typeof param === 'string' && !param)) {
          if (typeof errorCallback === 'function') {
            errorCallback(902, this.errors.e902, required_field);
          } else if (config.debug) {
            alert(this.errors.e902);
          }
          error = true;
          return;
        }
      });
    } catch (e) {
      //invalid data format
      if (typeof errorCallback === 'function') {
        errorCallback(904, this.errors.e904);
      } else if (config.debug) {
        alert(JSON.stringify(required_fields));
        alert(JSON.stringify(dataToCheck));
        alert(this.errors.e904);
      }
      return true;
    }

    return error;
  }

  checkError904(dataToCheck, validate_fields, errorCallback) {
    var error = false;

    try {
      var checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
      validate_fields.forEach((validate_field) => {
        //check valid mongo id
        if (dataToCheck[validate_field] &&
          dataToCheck[validate_field].search(new RegExp((checkForHexRegExp))) === -1) {
          errorCallback(904, this.errors.e904, validate_field);
          error = true;
          return;
        }
      });
    } catch (e) {
      //invalid data format
      if (typeof errorCallback === 'function') {
        errorCallback(904, this.errors.e904);
      } else if (config.debug) {
        alert(JSON.stringify(validate_fields));
        alert(JSON.stringify(dataToCheck));
        alert(this.errors.e904);
      }
      return true;
    }
    return error;
  }

  checkError907(dataToCheck, errorCallback) {
    if (typeof dataToCheck !== 'string' || !dataToCheck.includes('@'))
    /*!(/^[a-zA-Z0-9_]{2,}@[a-zA-Z0-9_\-]{2,}\.[a-zA-Z]{2,}$/.test(dataToCheck.trim()) ))*/ {
      if (typeof errorCallback === 'function') {
        errorCallback(907, this.errors.e907);
      } else if (config.debug) {
        alert(this.errors.e907);
      }
      return true;
    }
    return false;
  }

  checkError908(dataToCheck, errorCallback) {
    if (typeof dataToCheck === 'undefined' ||
      dataToCheck.trim().length < 6 || dataToCheck.indexOf(' ') > 0) {
      if (typeof errorCallback === 'function') {
        errorCallback(908, this.errors.e908);
      } else if (config.debug) {
        alert(this.errors.e908);
      }
      return true;
    }
    return false;
  }
}

export default API;
