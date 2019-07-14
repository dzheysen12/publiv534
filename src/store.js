import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import statusesReducer from './reducers/statuses';
import userReducer from './reducers/user';
import servicesReducer from './reducers/services';
import positionsReducer from './reducers/positions';
import employeeReducer from './reducers/employee';
import orderReducer from './reducers/orders';
import botsReducer from './reducers/bots';
import usersAdmin from './reducers/usersAdmin';
import categoryReducer from "./reducers/categories";



const rootReducer = combineReducers({
  statuses: statusesReducer,
  bots: botsReducer,
  user: userReducer,
  services: servicesReducer,
  positions: positionsReducer,
  employees: employeeReducer,
  orders: orderReducer,
  usersAdmin: usersAdmin,
  categories: categoryReducer
});

const configureStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};

export default configureStore;
