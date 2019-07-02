import { SET_EMPLOYEES_LIST, 
         DELETE_EMPLOYEE_FROM_LIST,
         SET_EMPLOYEE_FOR_EDIT, 
         SHOW_ADD_EMPLOYEE_WINDOW } from './types';

export const setEmployeesList = list => ({
    type: SET_EMPLOYEES_LIST,
    payload: list
});

export const deleteEmployeeFromList = index => ({
    type: DELETE_EMPLOYEE_FROM_LIST,
    index: index
});

export const setEmployeeForEdit = employee => ({
    type: SET_EMPLOYEE_FOR_EDIT,
    employee: employee
});

export const showModalWindow = () => ({
    type: SHOW_ADD_EMPLOYEE_WINDOW
});
