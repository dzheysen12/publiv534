import React from 'react';
import { Tabs, Row, Col, Icon } from 'antd';
import MenuLeft from '../components/Menu/Menu';
import Settings from "./components/Settings/Settings";
import Activator from "./components/Activator/Activator"
import Balance from "./components/Balance/Balance";
import History from "./components/History/History";
import { getUser } from '../../thunks/user';
import { getSettings } from '../../thunks/user';
import { connect } from 'react-redux';
import { dataWasLoad, settingsUser, getUserObject } from '../../selectors/user';
import { withRouter } from "react-router";

class Account extends React.Component {

  componentDidMount() {
      if (!this.props.user) {
        this.props.getUser()
      }
      if (!this.props.dataWasLoad) {
        this.props.getSettings()
      }
  };

  render() {
    let activate = this.props.user && this.props.user.activate;
    let userMoney = this.props.user && this.props.user.money;
    let activate_price = this.props.settings && this.props.settings.activate_price;
    const TabPane = Tabs.TabPane;
    const activeSucces = "activeOff";

    const content = (
        <Row type="flex">
          <Col lg={24} md={24} xl={18}>
            <Col lg={24} md={24} xl={17}>
            <Tabs
            defaultActiveKey="1"
            animated={false}>

              <TabPane
                tab={
                  <span>
                    <Icon type="solution" />
                    Настройка аккаунта
                  </span>
                } key="1">

                <div className="account__overlay">
                  <Settings/>
                </div>
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <Icon type="dollar" />
                    Баланс
                  </span>
                } key="2">
                <div className="account__overlay">
                  <Balance/>
                </div>
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <Icon type="book" />
                    История платежей
                  </span>
                } key="3">

                <div className="account__overlay">
                  <History/>
                </div>
              </TabPane>
          </Tabs>
            </Col>
            <Col className={ !!activate ? activeSucces : '' } lg={24} md={24} xl={7}>
              <Activator userMoney={userMoney} 
                         activate_price={activate_price}
                         activate={activate}
              />
            </Col>
          </Col>
        </Row>
    );

    return (
      <div>
        <MenuLeft content={content}/>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    user: getUserObject(state),
    settings: settingsUser(state),
    dataWasLoad: dataWasLoad(state),
  }
};

const mapDispatchToProps = ({
  getUser,
  getSettings
});

const ConnectedAccount = connect(mapStateToProps, mapDispatchToProps)(Account);

export default withRouter(ConnectedAccount);
