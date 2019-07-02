export const getOrders = state => {
    return state.orders.orders
};

export const getOrderForEdit = state => {
    return state.orders.order_for_edit
};

export const showAddWindow = state => {
    return state.orders.showAddWindow
};

export const getOrderDate = state => {
    return state.orders.date
};
export const getOrderTime = state => {
    return state.orders.time
};