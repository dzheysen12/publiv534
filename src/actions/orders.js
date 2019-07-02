import { SET_ORDERS_LIST,
         DELETE_ORDER_FROM_LIST,
         SET_ORDER_FOR_EDIT,
         SHOW_ADD_ORDER_WINDOW,
         SET_ORDER_DATE,
         SET_ORDER_TIME } from './types';
 

export const setOrdersList = orders => ({
    type: SET_ORDERS_LIST,
    orders: orders
});

export const deleteOrderFromList = id => ({
    type: DELETE_ORDER_FROM_LIST,
    id: id
});

export const setOrderForEdit = (order) => ({
    type: SET_ORDER_FOR_EDIT,
    order: order,
});

export const showModalWindow = () => ({
    type: SHOW_ADD_ORDER_WINDOW
});

export const setOrderDate = (date) => ({
    type: SET_ORDER_DATE,
    date: date
});

export const setOrderTime = (time) => ({
    type: SET_ORDER_TIME,
    time: time
});
