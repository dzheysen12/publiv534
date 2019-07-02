import { SET_STATUS_GLOBAL } from './types';


export const setStatus = (status, number) => {
  return {
    type: SET_STATUS_GLOBAL,
    status: status,
    errorNumber: number
  };
};
