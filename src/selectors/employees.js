export const getEmployeesList = state => {
    return state.employees.list
};

export const showAddWindow = state => {
    return state.employees.showAddWindow
};

export const getUserForEdit = state => {
    return state.employees.employee_for_edit
};