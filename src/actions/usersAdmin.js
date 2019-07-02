import { SET_USERS_ADMIN,
         DELETE_USER_ADMIN,
         SET_USER_ID,
         SET_MONEY } from './types';


export const setUsers = users => ({
    type: SET_USERS_ADMIN,
    users: users
});

export const setMoney = (money) => ({
    type: SET_MONEY,
    money: money,
});

export const deleteUserSuccess = userId => ({
    type: DELETE_USER_ADMIN,
    id: userId
});

export const setCurrentUserId = id => ({
    type: SET_USER_ID,
    id: id
});
