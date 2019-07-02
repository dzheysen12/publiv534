import { SET_CATEGORY_LIST } from '../actions/types';
import { ADD_CATEGORY_TO_LIST } from '../actions/types';
import { DELETE_CATEGORY_FROM_LIST } from '../actions/types';
import { SET_CATEGORY_FOR_EDIT } from '../actions/types';
import { SAVE_CATEGORY } from '../actions/types';

const initialState = {
  list: [],
  dataWasLoad: false,
  category_for_edit: {
    payload: null,
    index: -1
  }
};

const categoryReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_CATEGORY_LIST:
      return {
        ...state,
        dataWasLoad: true,
        list: action.payload
      };
    case ADD_CATEGORY_TO_LIST:
      return {
        ...state,
        list: state.list.concat(action.payload)
      };
    case DELETE_CATEGORY_FROM_LIST:
      return {
        ...state,
        list: state.list.slice(0, action.index).concat(state.list.slice(action.index + 1))
      };
    case SET_CATEGORY_FOR_EDIT:
      return {
        ...state,
        category_for_edit: {
          payload: state.list[action.index] || null,
          index: action.index
        }
      };
    case SAVE_CATEGORY:
      return {
        ...state,
        list: state.list.slice(0, action.index).concat(action.payload,
          state.list.slice(action.index + 1))
      };
    default:
      return state;
  }
};

export default categoryReducer;
