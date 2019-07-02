import { SET_USERS_ADMIN,
         DELETE_USER_ADMIN,
         SET_USER_ID,
         SET_MONEY } from '../actions/types';
         

const initialState = {
    users: [],
    current_user_id: null,
    money: null
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
          users: state.users.filter(user => user._id !== action.id)
        };

      case SET_USER_ID:
        return {
          ...state,
          currentUserId: action.id
        };  

      case SET_MONEY:
        return {
          ...state,
          users: [...state.users.map(user => user._id !== state.current_user_id ? user : {...user, money: action.money})]
        };
            
      default:
       return state
    }
};

export default usersAdminReducer;
