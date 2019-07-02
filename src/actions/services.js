import { SET_SERVICES_LIST,
         DELETE_SERVICE_FROM_LIST,
         SET_SERVICE_FOR_EDIT,
         SHOW_ADD_SERVICE_WINDOW } from './types';

export const setServicesList = services => {
  return {
    type: SET_SERVICES_LIST,
    services: services
  };
};

export const deleteServiceFromList = id => {
  return {
    type: DELETE_SERVICE_FROM_LIST,
    id: id
  };
};

export const setServiceForEdit = (service) => {
  return {
    type: SET_SERVICE_FOR_EDIT,
    service: service
  };
};

export const showModalWindow = () => ({
  type: SHOW_ADD_SERVICE_WINDOW
});