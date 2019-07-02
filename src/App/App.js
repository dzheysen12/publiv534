import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import '../style/css/main.min.css';
import "antd/dist/antd.css";

import Main from '../Page/Main';
import Buy from '../Page/Buy';
import Login from '../Login/Login';
import Register from '../Login/Register';
import Forgot from '../Login/Forgot';
import Account from '../User/Account/Account';
import Services from '../User/Services/Services';
import Employee from "../User/Employee/Employee";
import Bot from "../User/Bot/Bot";
import Position from "../User/Position/Position";
import Orders from "../User/Orders/Orders";
import PositionEdit from "../User/Position/PositionEdit";
import Politica from "../Page/Politica";
import Page404 from "../Page/Page404";
import OrderEdit from "../User/Orders/OrderEdit";
import Message from "../Admin/Message/Message";
import Setting from "../Admin/Settings/Setting";
import Users from "../Admin/User/Users";
import UserEdit from "../Admin/User/UserEdit";
import Dialog from "../Admin/Message/Dialog";
import BotList from "../User/Bot/BotList";
import CategoryList from "../User/Category/CategoryList";
import Statistics from "../User/Statistics/Statistics";

import Modal from '../Modal';




class App extends React.Component {
  render() {
    return (<>
      <Switch>

        <Route exact path={'/'} component={Main} />
        <Route exact path={'/Buy'} component={Buy} />
        <Route exact path={'/login'} component={Login} />
        <Route exact path={'/register'} component={Register} />
        <Route exact path={'/forgot'} component={Forgot} />
        <Route exact path={'/admin/message'} component={Message} />
        <Route exact path={'/admin/message/dialog'} component={Dialog} />
        <Route exact path={'/admin/setting'} component={Setting} />
        <Route exact path={'/admin/user'} component={Users}/>
        <Route exact path={'/admin/user/edit/:userid?'} component={UserEdit}/>
        <Route exact path={'/user/services'} component={Services} />
        <Route exact path={'/user/employee'} component={Employee} />
        <Route exact path={'/user/bot-list'} component={BotList}/>
        <Route exact path={'/user/bot/:id?'} component={Bot}/>
        <Route exact path={'/user/position'} component={Position} />
        <Route exact path={'/user/position/edit'} component={PositionEdit} />
        <Route exact path={'/user/position/add'} component={PositionEdit} />
        {/* <Route exact path={'/user/position/edit/:index'} component={PositionEdit} /> */}
        <Route exact path={'/user/position/edit/:positionid?'} component={PositionEdit} />
        <Route exact path={'/user/orders'} component={Orders} />
        <Route exact path={'/user/account/'} component={Account} />
        <Route exact path={'/user/orders/edit'} component={OrderEdit} />
        <Route exact path={'/user/category'} component={CategoryList} />
        {/* <Route exact path={'/user/category/edit/'} component={AddEdit} />
        <Route exact path={'/user/category/:id'} component={AddEdit} /> */}
        <Route exact path={'/user/statistics'} component={Statistics} />
        <Route exact path={'/politica'} component={Politica} />
        {/*<Route exact path={'/404'} component={Page404} />*/}
        <Redirect to={"/404"}/>
      </Switch>
      <Modal/>
      </>
    );
  };
}

export default App;
