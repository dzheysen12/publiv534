import { SET_ERRORS } from '../actions/types';
import { SET_LOADING_STATUS } from '../actions/types';

const initialState = {
  loadingStatus: false
};

const errorReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_ERRORS:
      return action.payload;
    case SET_LOADING_STATUS:
      return {
        ...state,
        loadingStatus: action.payload
      };
    default:
      return state;
  }
};

export default errorReducer;