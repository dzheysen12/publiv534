export const getServicesList = state => {
    return state.services.services
};

export const getServiceForEdit = state => {
    return state.services.service_for_edit
};

export const showAddWindow = state => {
    return state.services.showAddWindow
};
