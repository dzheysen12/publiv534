import { SET_ERRORS,
         SET_LOADING_STATUS,
         SET_STATUS_GLOBAL} from '../actions/types';


const initialState = {
  loadingStatus: false,
  status: null,
  errorNumber: null
};

const statusesReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_ERRORS:
      return action.payload;
    case SET_LOADING_STATUS:
      return {
        ...state,
        loadingStatus: action.payload
      };
    case SET_STATUS_GLOBAL:
      return {
        ...state,
        status: action.status,
        errorNumber: action.errorNumber
      };
    default:
      return state;
  }

};

export default statusesReducer;
