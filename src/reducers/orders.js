import { SET_ORDERS_LIST, 
         DELETE_ORDER_FROM_LIST,
         SET_ORDER_FOR_EDIT, 
         SHOW_ADD_ORDER_WINDOW,
         SET_ORDER_DATE,
         SET_ORDER_TIME } from '../actions/types';

const initialState = {
    orders: [],
    dataWasLoad: false,
    order_for_edit: null,
    showAddWindow: false,
    time: null,
    date: null
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ORDERS_LIST:
        return {
          ...state,
          dataWasLoad: true,
          orders: action.orders
        };

      case DELETE_ORDER_FROM_LIST:
        return {
          ...state,
          orders: state.orders.filter(order => order._id !== action.id)
        };

      case SET_ORDER_FOR_EDIT:
        return {
          ...state,
          order_for_edit: action.order ? {...action.order} : null,
        };

      case SHOW_ADD_ORDER_WINDOW:
        return {
          ...state,
          showAddWindow: !state.showAddWindow
        };

      case SET_ORDER_DATE:
        return {
          ...state,
          date: action.date
        };

      case SET_ORDER_TIME:
        return {
          ...state,
          time: action.time
        };

      default:
        return state;
  
    }
};

export default orderReducer;