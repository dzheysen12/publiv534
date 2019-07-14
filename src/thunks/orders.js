import Orders from '../helpers/Api/Orders';
import { setOrdersList, 
         deleteOrderFromList, 
         showModalWindow, 
         setOrderForEdit,
         setOrderTime,
         setOrderDate } from '../actions/orders';
import { setStatus } from '../actions/statuses';
import { statuses } from '../helpers/statuses';


export const getOrdersList = () => dispatch => {
  dispatch(setStatus(statuses.LOADING));
    Orders.list( {}, 
    (data) => {
      dispatch(setStatus(statuses.NOT_INITIALIZED));
      dispatch(setOrdersList(data.crm_orders));
  }, (data) => {
      dispatch(setStatus(statuses.ERROR, data));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};

export const addOrder = (values, orderTime, bot) => dispatch => {
  dispatch(setStatus(statuses.LOADING));
    Orders.add({
        name: values.name,
        contacts: values.contacts,
        service: values.service,
        employee: values.employee,
        description: values.description,
        bot: bot,
        time: orderTime
      }, () => {
          dispatch(setStatus(statuses.SUCCESS));
          dispatch(setStatus(statuses.NOT_INITIALIZED));
          dispatch(getOrdersList());
          dispatch(showModalWindow());
          dispatch(setOrderForEdit(null));
          dispatch(setOrderTime(null));
          dispatch(setOrderDate(null));
      }, (data) => {
          dispatch(setStatus(statuses.ERROR, data));
          dispatch(setStatus(statuses.NOT_INITIALIZED));
      });
  };

export const deleteOrder = (id) => (dispatch) => {
  dispatch(setStatus(statuses.LOADING));
    Orders.delete({
      crm_orderid: id
      }, () => {
          dispatch(setStatus(statuses.SUCCESS));
          dispatch(setStatus(statuses.NOT_INITIALIZED));
          dispatch(deleteOrderFromList(id));
      }, (data) => {
          dispatch(setStatus(statuses.ERROR, data));
          dispatch(setStatus(statuses.NOT_INITIALIZED));
    });
};

export const editOrder = (values, crm_orderid, orderTime) => dispatch => {
  dispatch(setStatus(statuses.LOADING));
    Orders.edit({
        name: values.name,
        contacts: values.contacts,
        service: values.service,
        employee: values.employee,
        crm_orderid: crm_orderid,
        description: values.description,
        time: orderTime
      }, () => {
          dispatch(setStatus(statuses.SUCCESS));
          dispatch(setStatus(statuses.NOT_INITIALIZED));
          dispatch(getOrdersList());
          dispatch(showModalWindow());
          dispatch(setOrderForEdit(null));
          dispatch(setOrderTime(null));
          dispatch(setOrderDate(null));
      }, (data) => {
          dispatch(setStatus(statuses.ERROR, data));
          dispatch(setStatus(statuses.NOT_INITIALIZED));
      });
  };
