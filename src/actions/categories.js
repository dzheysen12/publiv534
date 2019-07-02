import { SET_CATEGORY_LIST,
         DELETE_CATEGORY_FROM_LIST,
         SET_CATEGORY_FOR_EDIT,
         SHOW_ADD_CATEGORY_WINDOW } from './types';


export const setCategoriesList = categories => {
  return {
    type: SET_CATEGORY_LIST,
    categories: categories
  };
};

export const deleteCategoryFromList = id => {
  return {
    type: DELETE_CATEGORY_FROM_LIST,
    id: id
  };
};

export const setCategoryForEdit = (category) => {
  return {
    type: SET_CATEGORY_FOR_EDIT,
    category: category
  };
};

export const showModalWindow = () => ({
  type: SHOW_ADD_CATEGORY_WINDOW
});