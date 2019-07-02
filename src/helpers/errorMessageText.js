export const errorSwitchText = (errorNumber) => {
  switch(errorNumber) {
    case 403:
        return 'Доступ запрещен';
    case 901:
        return 'Аутентификация не пройдена';
    case 902:
        return 'Необходимые данные не были предоставлены';
    case 903:
        return 'Email уже используется';
    case 904:
        return 'Некорректные данные';
    case 905:
        return 'Неверный пароль или email';
    case 906:
        return 'Пользователь с данным email не найден';
    case 907:
        return 'Некорректный email';
    case 908:
        return 'Некорректный пароль';
    default:
      return 'Ошибка';
  }
} 