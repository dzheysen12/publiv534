import { SET_USER,
         SET_SETTINGS } from './types';


export const setUser = user => {
    return {
        type: SET_USER,
        user: user
    };
};

export const setSettings = settings => {
  return {
    type: SET_SETTINGS,
    payload: settings
  };
};
