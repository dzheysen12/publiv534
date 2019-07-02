import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App/App';
import { Provider } from 'react-redux';
import './index.css';
import configureStore from './store';

const store = configureStore();
const statuses = store.getState().statuses

window.store = store
ReactDOM.render(
  <Provider store = { store }>
  <BrowserRouter> 
    <App statuses={statuses} />
  </BrowserRouter>
  </Provider>,
  document.getElementById('root'));