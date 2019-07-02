import { SET_CATEGORY_LIST } from './types';
import { ADD_CATEGORY_TO_LIST } from './types';
import { DELETE_CATEGORY_FROM_LIST } from './types';
import { SET_CATEGORY_FOR_EDIT } from './types';
import { SAVE_CATEGORY } from './types';

export const setCategoryList = list => {
  return {
    type: SET_CATEGORY_LIST,
    payload: list
  };
};

export const addCategoryToList = position => {
  return {
    type: ADD_CATEGORY_TO_LIST ,
    payload: position
  };
};

export const deleteCategoryFromList = index => {
  return {
    type: DELETE_CATEGORY_FROM_LIST,
    index: index
  };
};

export const setCategoryForEdit = (index) => {
  return {
    type: SET_CATEGORY_FOR_EDIT,
    index: index
  };
};

export const saveCategory = (position, index) => {
  return {
    type: SAVE_CATEGORY,
    payload: position,
    index: index
  };
};
