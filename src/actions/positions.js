import { SET_POSITIONS_LIST,
         DELETE_POSITION_FROM_LIST,
         SET_POSITION_FOR_EDIT } from './types';


export const setPositionsList = list => {
  return {
    type: SET_POSITIONS_LIST,
    payload: list
  };
};

export const deletePositionFromList = index => {
  return {
    type: DELETE_POSITION_FROM_LIST,
    index: index
  };
};

export const setPositionForEdit = (position) => {
  return {
    type: SET_POSITION_FOR_EDIT,
    position: position
  };
};
