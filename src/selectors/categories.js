export const getCategoriesList = state => {
    return state.categories.categories
};

export const showAddWindow = state => {
    return state.categories.showAddWindow
};

export const getCategorForEdit = state => {
    return state.categories.category_for_edit
};