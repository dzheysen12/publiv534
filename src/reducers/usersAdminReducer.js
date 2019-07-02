import { SET_USERS_ADMIN } from '../actions/types';
import { DELETE_USER_ADMIN } from '../actions/types';

const initialState = {
    users: []
};

const usersAdminReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USERS_ADMIN:
            return {
                ...state,
                users: action.users
            };

        case DELETE_USER_ADMIN:
            return {
                ...state,
                users: state.users.filter(user => user._id != action.id)
            };
        default:
            return state
    }
};

export default usersAdminReducer;
