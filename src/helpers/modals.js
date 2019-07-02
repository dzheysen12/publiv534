import { message } from 'antd';
import { errorSwitchText } from './errorMessageText';

export const successModal = () => {
  let messageText = 'Сохранено'
    message.success(messageText);
  };

export const errorModal = (errorNumber) => {
    message.error(errorSwitchText(errorNumber));
  };
  