import { SET_CATEGORY_LIST,
         DELETE_CATEGORY_FROM_LIST,
         SET_CATEGORY_FOR_EDIT,
         SHOW_ADD_CATEGORY_WINDOW } from '../actions/types';


const initialState = {
  categories: [],
  dataWasLoad: false,
  category_for_edit: null,
  showAddWindow: false
};

const categoryReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_CATEGORY_LIST:
      return {
        ...state,
        dataWasLoad: true,
        categories: action.categories
      };
    case DELETE_CATEGORY_FROM_LIST:
      return {
        ...state,
        categories: state.categories.filter(category => category._id !== action.id)
      };
    case SET_CATEGORY_FOR_EDIT:
      return {
        ...state,
        category_for_edit: action.category ? {...action.category} : null
      };
    case SHOW_ADD_CATEGORY_WINDOW:
      return {
        ...state,
        showAddWindow: !state.showAddWindow
    };
    default:
      return state;
  }
};

export default categoryReducer;
