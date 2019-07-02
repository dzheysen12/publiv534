import Services from '../../src/helpers/Api/Services';
import { setServicesList, 
         deleteServiceFromList, 
         showModalWindow, 
         setServiceForEdit } from '../actions/services';
import { setStatus } from '../actions/statuses';
import {statuses} from '../helpers/statuses';

export const getServices = () => dispatch => {
  dispatch(setStatus(statuses.LOADING));
    Services.list({}, 
      (data) => {
        dispatch(setStatus(statuses.NOT_INITIALIZED));
        dispatch(setServicesList(data.services));
    }, (data) => {
        dispatch(setStatus(statuses.ERROR, data));
        dispatch(setStatus(statuses.NOT_INITIALIZED));
    });
};

export const addService = (values) => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Services.add({
      name: values.name,
      price: values.price,
      category: values.categoryid
    }, () => {
        dispatch(setStatus(statuses.SUCCESS));
        dispatch(setStatus(statuses.NOT_INITIALIZED));
        dispatch(getServices());
        dispatch(showModalWindow());
    }, (data) => {
        dispatch(setStatus(statuses.ERROR, data));
        dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};

export const editService = (values, serviceid ) => dispatch => {
  dispatch(setStatus(statuses.LOADING));
    Services.edit({
        serviceid: serviceid,
        name: values.name,
        price: values.price,
        categoryid: values.categoryid
    }, () => {
        dispatch(setStatus(statuses.SUCCESS));
        dispatch(setStatus(statuses.NOT_INITIALIZED));
        dispatch(getServices());
        dispatch(showModalWindow());
        dispatch(setServiceForEdit(null));
    }, (data) => {
        dispatch(setStatus(statuses.ERROR, data));
        dispatch(setStatus(statuses.NOT_INITIALIZED));
    });
};

export const deleteService = (id) => dispatch => {
  dispatch(setStatus(statuses.LOADING));
    Services.delete({
        serviceid: id
    }, () => {
        dispatch(setStatus(statuses.SUCCESS));
        dispatch(setStatus(statuses.NOT_INITIALIZED));
        dispatch(deleteServiceFromList(id));
        dispatch(getServices());
    }, (data) => {
        dispatch(setStatus(statuses.ERROR, data));
        dispatch(setStatus(statuses.NOT_INITIALIZED));
    });
};