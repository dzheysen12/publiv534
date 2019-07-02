import { SET_EMPLOYEES_LIST, 
         DELETE_EMPLOYEE_FROM_LIST,
         SET_EMPLOYEE_FOR_EDIT, 
         SHOW_ADD_EMPLOYEE_WINDOW } from '../actions/types';

const initialState = {
  list: [],
  dataWasLoad: false,
  employee_for_edit: null,
  showAddWindow: false,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMPLOYEES_LIST:
      return {
        ...state,
        dataWasLoad: true,
        list: action.payload
      };

    case DELETE_EMPLOYEE_FROM_LIST:
      return {
        ...state,
        list: state.list.slice(0, action.index).concat(state.list.slice(action.index + 1))
      };

    case SET_EMPLOYEE_FOR_EDIT:
      return {
        ...state,
        employee_for_edit: action.employee ? {...action.employee} : null,
      };

    case SHOW_ADD_EMPLOYEE_WINDOW:
      return {
        ...state,
        showAddWindow: !state.showAddWindow
    };

    default:
      return state;
  }
};

export default employeeReducer;
