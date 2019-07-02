import { SET_BOT_LIST,
         DELETE_BOT_FROM_LIST,
         SET_BOT_FOR_EDIT,
         SET_MESSAGE,
         SET_MESSAGES_FROM_SERVER,
         CLEAN_MESSAGES,
         SHOW_ADD_ORDER_WINDOW_BOT } from '../actions/types';


const initialState = {
  bots: [],
  messages: [],
  dataWasLoad: false,
  bot_for_edit: null,
  showAddWindow: false
};

const botsReducer = (state = initialState, action) => {
  switch(action.type) {

    case SET_BOT_LIST:
      return {
        ...state,
          dataWasLoad: true,
          bots: action.bots
      };

    case DELETE_BOT_FROM_LIST:
      return {
        ...state,
        bots: state.bots.filter(bot => bot._id !== action.id)
      };

    case SET_BOT_FOR_EDIT:
      return {
        ...state,
        bot_for_edit: action.bot ? {...action.bot} : null
      };

    case SET_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message]
      };

    case SET_MESSAGES_FROM_SERVER:
      let messages = [];
      action.message.forEach(message => messages.push({message: message}));
      return {
        ...state, 
        messages: [...state.messages, ...messages]
      };

    case CLEAN_MESSAGES:
      return {
        ...state, 
        messages: []
      };

    case SHOW_ADD_ORDER_WINDOW_BOT:
      return {
        ...state,
        showAddWindow: !state.showAddWindow
      };  

    default:
      return state;
  }
};

export default botsReducer;
