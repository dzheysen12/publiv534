import { SET_SERVICES_LIST,
         DELETE_SERVICE_FROM_LIST,
         SET_SERVICE_FOR_EDIT,
         SHOW_ADD_SERVICE_WINDOW,
         SET_CATEGORY_LIST } from '../actions/types';


const initialState = {
  services: [],
  categories: [],
  service_for_edit: null,
  showAddWindow: false
};

const servicesReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_SERVICES_LIST:
      return {
        ...state,
        services: action.services
      };

    case DELETE_SERVICE_FROM_LIST:
      return {
        ...state,
        services: state.services.filter(service => service._id !== action.id)
      };

    case SET_SERVICE_FOR_EDIT:
      return {
        ...state,
        service_for_edit: action.service ? {...action.service} : null
      };

    case SET_CATEGORY_LIST:
      return {
       ...state,
        categories: action.categories
    };

    case SHOW_ADD_SERVICE_WINDOW:
      return {
        ...state,
        showAddWindow: !state.showAddWindow
    };
    default:
      return state;
  }
};

export default servicesReducer;