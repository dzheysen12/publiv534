module.exports = {
  Backend: 'https://dfgfdfgdf.herokuapp.com/',
  Frontend: window.location.origin,
  debug: true,

  validate: {
    email: [{
      pattern: /@/,
      required: true,
      message: 'Введите корректный email!'
    }],
    password: [{
      min: 8,
      required: true,
      message: 'Пароль должен содержать минимум 8 символов!'
    }],
    password_not_required: [{
      min: 8,
      message: 'Пароль должен содержать минимум 8 символов!'
    }],
    price: [{
      required: true,
      message: 'Вы не ввели цену',
    }, {
      validator: (rule, value, callback) =>
      {
        callback(value < 0 ? 'Цена не может быть ниже 0' : undefined)
      }
    }],
    serviceTime: [{
      required: true,
      message: 'Вы не ввели время обслуживания',
    }, {
      validator: (rule, value, callback) =>
      {
        callback(value < 0 ? 'Время обслуживания не может быть ниже 0' : undefined)
      }
    }],
  }
};

