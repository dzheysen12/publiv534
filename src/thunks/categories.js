import Category from '../../src/helpers/Api/Category';
import { setCategoriesList, showModalWindow, deleteCategoryFromList } from '../actions/categories';
import { setStatus } from '../actions/statuses';
import { statuses } from '../helpers/statuses';


export const getCategories = () => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Category.list( {}, 
    (data) => {
      dispatch(setStatus(statuses.NOT_INITIALIZED));
      dispatch(setCategoriesList(data.categories));
    }, (data) => {
        dispatch(setStatus(statuses.ERROR, data));
        dispatch(setStatus(statuses.NOT_INITIALIZED));
    });
};

export const deleteCategory = (id) => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Category.delete({
    categoryid: id
  }, () => {
      dispatch(setStatus(statuses.SUCCESS));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
      dispatch(deleteCategoryFromList(id));
  }, (data) => {
      dispatch(setStatus(statuses.ERROR, data));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};

export const addCategory = (values) => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Category.add({
    name: values.name,
    description: values.description,
  }, () => {
      dispatch(setStatus(statuses.SUCCESS));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
      dispatch(getCategories());
      dispatch(showModalWindow());
  }, (data) => {
      dispatch(setStatus(statuses.ERROR, data));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
    });
};

export const editCategory = (values, categoryid) => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Category.edit({
    categoryid: categoryid,
    name: values.name,
    description: values.description
  }, () => {
      dispatch(setStatus(statuses.SUCCESS));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
      dispatch(getCategories());
      dispatch(showModalWindow());
  }, (data) => {
      dispatch(setStatus(statuses.ERROR, data));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};
