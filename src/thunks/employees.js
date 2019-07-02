import Employee from '../helpers/Api/Users';
import { setEmployeesList, 
         deleteEmployeeFromList, 
         showModalWindow } from '../actions/employees';
import { setStatus } from '../actions/statuses';
import { statuses } from '../helpers/statuses';

export const getEmployees = () => (dispatch) => {
  dispatch(setStatus(statuses.LOADING));
  Employee.list(
    {
      type: 'employee'
    }, (data) => {
        dispatch(setStatus(statuses.NOT_INITIALIZED));
        dispatch(setEmployeesList(data.users));
    }, (data) => {
        dispatch(setStatus(statuses.ERROR, data));
        dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};

export const deleteEmployee = (userId) => (dispatch) => {
  dispatch(setStatus(statuses.LOADING));
  Employee.delete({
      userid: userId
    }, () => {
        dispatch(setStatus(statuses.SUCCESS));
        dispatch(setStatus(statuses.NOT_INITIALIZED));
        dispatch(deleteEmployeeFromList(userId));
        dispatch(getEmployees());
    }, (data) => {
        dispatch(setStatus(statuses.ERROR, data));
        dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};

export const editEmployee = (values, userid) => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Employee.editEmployee({
    userid: userid,
    password: values.password,
    email: values.email,
    name: values.name,
    surname: values.surname,
    position: values.position 	
  }, () => {
      dispatch(setStatus(statuses.SUCCESS));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
      dispatch(getEmployees());
      dispatch(showModalWindow());
  }, (data) => {
      dispatch(setStatus(statuses.ERROR, data));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};

export const addEmployee = (values, usertype) => dispatch => {
  dispatch(setStatus(statuses.LOADING));
  Employee.register({
    usertype: usertype,
    password: values.password,
    email: values.email,
    name: values.name,
    surname: values.surname,
    position: values.position 	
  }, () => {
      dispatch(setStatus(statuses.SUCCESS));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
      dispatch(showModalWindow());
      dispatch(getEmployees());
  }, (data) => {
      dispatch(setStatus(statuses.ERROR, data));
      dispatch(setStatus(statuses.NOT_INITIALIZED));
  });
};
