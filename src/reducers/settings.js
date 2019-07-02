import { SET_SETTINGS } from '../actions/types';

const initialState = {
  dataWasLoad: false
};

const settingsReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_SETTINGS:
      return {
        ...action.payload,
        dataWasLoad: true,
      };
    default:
      return state;
  }
};

export default settingsReducer;