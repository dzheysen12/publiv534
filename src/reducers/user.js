import { SET_USER,
         SET_SETTINGS } from '../actions/types';


const initialState = {
  dataWasLoad: false,
  user: null,
  settings: null
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
        dataWasLoad: true,
      };
    case SET_SETTINGS:
      return {
        ...state,
        settings: action.payload,
        dataWasLoad: true,
      };
    default:
      return state;
  }
};

export default userReducer;