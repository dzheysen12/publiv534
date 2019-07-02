import Cookies from 'universal-cookie';
const cookies = new Cookies();

export function randomColor() {
  var r = Math.floor(Math.random() * (256));
  var g = Math.floor(Math.random() * (256));
  var b = Math.floor(Math.random() * (256));
  return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}

export function navigateBack(){
  window.history.back();
}

export function onChangeHandler(event, callback) {
  try {
    var arr = event.target.name.split('.');
    eval('this.state.' + event.target.name
      + ' = event.target.type != \'checkbox\' ? event.target.value' +
      ' : (event.target.checked ? true : false)');

    if (typeof callback !== 'function') {
      callback = undefined;
    }

    this.setState({
      [arr[0].replace(/\[[0-9*]+\]/, '')]: this.state[arr[0].replace(/\[[0-9*]+\]/, '')]
    }, callback);
  } catch (e) {
    console.log(e);
    alert('change error: ' + event.target.name);
  }
}

export function sortByField(array, property) {
  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      if (a[property] === undefined)
        a[property] = 0;

      if (b[property] === undefined)
        b[property] = 0;

      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  array.sort(dynamicSort(property));
  return array;
}

export function home() {
  window.location.href = window.location.origin + `/user/account/`;

}

export function redirect(path) {
  window.location.href = window.location.origin + '/' + path;
}

export function getLanguage() {
  var language = window.navigator ? (window.navigator.language ||
    window.navigator.systemLanguage ||
    window.navigator.userLanguage) : (navigator.userLanguage);
  language = language.substr(0, 2).toLowerCase();
  return language;
}

export function login(auth, type, language_id) {
  cookies.set('auth', auth, {
    path: '/'
  });

  cookies.set('type', type, {
    path: '/'
  });

  if (language_id) {
    cookies.set('language_id', language_id, {
      path: '/'
    });
  }

  if (type === 'admin') {
    window.location.href = window.location.origin + '/admin/user';
  } else if ( type === 'user') {
    window.location.href = window.location.origin + '/user/bot-list';
  } else if (type === 'employee') {
    window.location.href = window.location.origin + '/user/account';
  }
}

export function getHelpPageLink(slug) {
  return window.location.origin + '/help/' + slug;
}

export function onExitHandler(event) {
  if (event && event.preventDefault) {
    event.preventDefault();
  }

  cookies.remove('auth', {
    path: '/'
  });
  cookies.remove('type', {
    path: '/'
  });
  cookies.remove('language_id', {
    path: '/'
  });
  window.location.href = window.location.origin;
}

export function getIds(array) {
  return array.map(elem => elem._id);
}

export function dateFormat(date) {
  date = date || new Date();
  if (typeof date !== 'object') {
    date = new Date(date);
  }
  var curr_date = date.getDate() + '';
  if (curr_date.length === 1) {
    curr_date = '0' + curr_date;
  }
  var curr_month = (date.getMonth() + 1) + '';
  if (curr_month.length === 1) {
    curr_month = '0' + curr_month;
  }
  var curr_year = date.getFullYear();

  return (curr_year + '-' + curr_month + '-' + curr_date);
}

export function find(arr, search) {
  var res = [];
  arr.forEach(function (e) {
    var add = true;
    for (var key in search) {
      if (e[key] !== search[key]) {
        add = false;
        break;
      }
    }
    if (add) {
      res.push(e);
    }
  });
  return res;
};

export function clearInput(event) {
  event.target.value = null;
}

export function findOne(arr, search, returnIndex) {
  var res;

  arr.forEach(function (e, index) {
    var add = true;
    for (var key in search) {
      if (e[key] !== search[key]) {
        add = false;
        break;
      }
    }
    if (add) {
      res = returnIndex ? index : e;
      return;
    }
  });

  return res;
};


