import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getUser, settingsList } from '../../../thunks/user';
import { settingsUser, dataWasLoad } from '../../../selectors/user';

const { Header, Content, Footer, Sider } = Layout;
const helpers = require('../../../helpers/functions.js');

class MenuLeft extends React.Component {

  state = {
    collapsed: false,
  };

  componentDidMount() {
    if (!this.props.dataWasLoad) {
      this.props.getUser()
    }
    if (!this.props.dataWasLoad) {
      this.props.settingsList()
    }
  }

  render(){
    let money = this.props.user && this.props.user.money;
    const sliderBg = {
      overflow: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 0,
      backgroundColor: '#fff'
    };

    return (

      <Layout>
        <Sider style={sliderBg}>

          <div className="menu_logo">
            <div className="menu_logo-item"></div>
          </div>

          <Menu className={"left__menu"} theme="light" mode="vertical">
            <Menu.Item
              key="1"
              className={window.location.href.indexOf("/user/orders")!==-1 ? "menu__item--active" : ""}>
                <Icon type="profile" />

                <span  className="nav-text">Заказы</span>

                <Link to="/user/orders" />

            </Menu.Item>

            <Menu.Item
              key="2"
              className={window.location.href.indexOf("/user/bot-list")!==-1 || window.location.href.indexOf("/user/bot")!==-1 ? "menu__item--active" : ""}>
                <Icon type="robot" />

                <span className="nav-text">Бот</span>

                <Link activeclassname='menu__item--active' to="/user/bot-list" />
            </Menu.Item>

            <Menu.Item
              key="3"
              className={window.location.href.indexOf("/user/services")!==-1 ? "menu__item--active" : ""}>
              <Icon type="upload" />

              <span className="nav-text">Услуги</span>

              <Link to="/user/services" />
            </Menu.Item>

            <Menu.Item
              key="5"
              className={window.location.href.indexOf("/user/statistics")!==-1 ? "menu__item--active" : ""}>
              <Icon type="bar-chart" />

              <span className="nav-text">Статистика</span>

              <Link to="/user/statistics"/>
            </Menu.Item>

            <Menu.Item
              key="6"
              className={window.location.href.indexOf("/user/position")!==-1 ? "menu__item--active" : ""}>
              <Icon type="interation" />

              <span className="nav-text">Должности</span>

              <Link to="/user/position" />
            </Menu.Item>

            <Menu.Item
              key="7"
              className={window.location.href.indexOf("/user/employee")!==-1 ? "menu__item--active" : ""}>
              <Icon type="team" />

              <span className="nav-text">Сотрудники</span>

              <Link to="/user/employee" />
            </Menu.Item>

            <Menu.Item
              key="8"
              className={window.location.href.indexOf("/user/account/:userid?")!==-1 ? "menu__item--active" : ""}>
              <Icon type="setting" />

              <span className="nav-text">Настройки</span>

              <Link to="/user/account" />
            </Menu.Item>

          </Menu>

          <div className="menu__item" onClick={helpers.onExitHandler}>
            <div className="item__icon">
              <Icon type="logout" />
            </div>

            <span className="nav-text">Выход</span>

          </div>

        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header className={"header__menu"} style={{ background: '#323BA5', padding: 0 }} >

            <div className="header__balance">
              <span className={"balance__text"}>Баланс:</span>

              <span className={"balance__price"}>{money || 0}р</span>
            </div>
          </Header>

          <Content style={{ margin: '80px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 'calc(100vh - 11.25em)' }}>
              {this.props.content}
            </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            Bot Manager ©2019
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    settings: settingsUser(state),
    dataWasLoad: dataWasLoad(state)
  }
};

const mapDispatchToProps = ({
  getUser,
  settingsList
})


export default connect(mapStateToProps, mapDispatchToProps)(MenuLeft);
