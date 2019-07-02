import UsersAdmin from '../helpers/Api/UsersAdmin';
import { setUsers, 
         deleteUserSuccess, 
         setMoney } from '../actions/usersAdmin';
import {login} from "../helpers/functions";

export const getUsers = () => (dispatch) => {
    UsersAdmin.list({}, (data) => {
        dispatch(setUsers(data.users))
      });
};

export const deleteUser = (userId) => (dispatch) => {
    UsersAdmin.delete({
        userid: userId
      }, () => {
        dispatch(deleteUserSuccess(userId));
    });
};

export const editUser = (id, money) => (dispatch) => {
    UsersAdmin.edit({
        userid: id,
        money: money
    }, () => {
            dispatch(setMoney(money));
        }
    );
};

export const requestUserData = (userid) => {
  UsersAdmin.view({
    userid: userid
  }, (data) =>  {
     login(data.auth, data.type, data._id);
  })
};