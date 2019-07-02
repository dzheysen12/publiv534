import Account from '../helpers/Api/Account';
import Users from '../helpers/Api/Users';
import Settings from '../helpers/Api/Settings';
import { setSettings } from "../actions/user";
import { setUser } from "../actions/user";
import { setStatus } from '../actions/statuses';
import {statuses} from '../helpers/statuses';


export const userActivate = () => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Users.activate({}, 
    (data) => {
      dispatch(setStatus(statuses.NOT_INITIALIZED));
      dispatch(setUser(data));
  }, (data) => {
      dispatch(setStatus(statuses.ERROR, data));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};

export const settingsList = () => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Settings.list({}, 
    (data) => {
      dispatch(setStatus(statuses.NOT_INITIALIZED));
      dispatch(setSettings(data.settings));
    }, (data) => {
      dispatch(setStatus(statuses.ERROR, data));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};

export const getUser = () => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Users.me( {}, 
    (data) => {
      dispatch(setStatus(statuses.NOT_INITIALIZED));
      dispatch(setUser(data));
  }, (data) => {
      dispatch(setStatus(statuses.ERROR, data));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};

export const getSettings = () => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Account.list({}, 
    (data) => {
      dispatch(setStatus(statuses.NOT_INITIALIZED));
      dispatch(setSettings(data.settings));
    }, (data) => {
      dispatch(setStatus(statuses.ERROR, data));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
    });
};

export const editUser = (values) => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Users.edit({
    name: values.name,
    email: values.email,
    password: values.password
  }, () => {        
      dispatch(setStatus(statuses.SUCCESS));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
      dispatch(getUser());
  }, (data) => {
      dispatch(setStatus(statuses.ERROR, data));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};
