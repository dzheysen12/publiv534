import { SET_ERRORS } from './types';
import { SET_LOADING_STATUS } from './types';

export const setErrors = errors => {
  return {
    type: SET_ERRORS,
    payload: errors
  };
};

export const setLoadingStatus = status => {
  return {
    type: SET_LOADING_STATUS,
    payload: status
  };
};