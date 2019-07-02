import { SET_BOT_LIST,
         SET_MESSAGES_FROM_SERVER,
         DELETE_BOT_FROM_LIST,
         SET_BOT_FOR_EDIT,
         SET_MESSAGE,
         CLEAN_MESSAGES,
         SHOW_ADD_ORDER_WINDOW_BOT } from './types';


export const setBotsList = bots => {
  return {
    type: SET_BOT_LIST,
    bots: bots
  };
};

export const deleteBotFromList = id => {
  return {
    type: DELETE_BOT_FROM_LIST,
    id: id
  };
};

export const setBotForEdit = bot => {
  return {
    type: SET_BOT_FOR_EDIT,
    bot: bot
  };
};

export const setMessage = message => {
  return {
    type: SET_MESSAGE,
    message: message
  };
};

export const setMessagesFromServer = data => {
  return {
    type: SET_MESSAGES_FROM_SERVER,
    message: data
  };
};

export const clearMessagesFromBot = () => {
  return {
    type: CLEAN_MESSAGES
  };
};

export const showModalWindow = () => ({
  type: SHOW_ADD_ORDER_WINDOW_BOT
});
