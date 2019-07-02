export const getCurrentUserMoney = (state) => {
  let user = state.usersAdmin.users.find(user => user._id === state.usersAdmin.current_user_id);
  let money = user && user.money; 
  return money;
};

export const getUsersList = (state) => {
  return state.usersAdmin.users
}