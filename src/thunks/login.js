import Users from '../helpers/Api/Users.js';
import { setStatus } from '../actions/statuses';
import {statuses} from '../helpers/statuses';

let helpers = require('../helpers/functions.js');



export const userSession = (values) => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Users.session({
    email: values.email,
    password: values.password
  }, (data) => {
      dispatch(setStatus(statuses.NOT_INITIALIZED));
      helpers.login(data.auth, data.type, data.language_id);
  }, (data) => {
      dispatch(setStatus(statuses.ERROR, data));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};

export const userRegister = (values) => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Users.register({
    name: values.name,
    surname: values.surname,
    email: values.email,
    password: values.password,
    usertype: 'user'
  }, (data) => {
      dispatch(setStatus(statuses.NOT_INITIALIZED));
      helpers.login(data.auth, data.type, data.language_id);
  }, (data) => {
      dispatch(setStatus(statuses.ERROR, data));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};

export const forgot = (email) => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Users.request({
    email: email
  }, () => {
      dispatch(setStatus(statuses.NOT_INITIALIZED));
  }, (data) => {
      dispatch(setStatus(statuses.ERROR, data));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};

