import React from 'react';
import { Icon, Layout, Menu } from 'antd';
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const helpers = require('../../../helpers/functions.js');

class MenuLeft extends React.Component {

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
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
                            className={window.location.href.indexOf("/admin/user") !== -1 ? "menu__item--active" : ""}>
                            <Icon type="profile"/>

                            <span className="nav-text">Пользователи</span>

                            <Link to="/admin/user"/>

                        </Menu.Item>

                        <Menu.Item
                            key="2"
                            className={window.location.href.indexOf("/admin/message") !== -1 ? "menu__item--active" : ""}>
                            <Icon type="mail"/>

                            <span className="nav-text">Сообщения</span>

                            <Link to="/admin/message"/>

                        </Menu.Item>

                        <Menu.Item
                            key="3"
                            className={window.location.href.indexOf("/admin/setting") !== -1 ? "menu__item--active" : ""}>
                            <Icon type="robot"/>

                            <span className="nav-text">Настройки</span>

                            <Link to="/admin/setting"/>
                        </Menu.Item>

                    </Menu>

                    <div className="menu__item" onClick={helpers.onExitHandler}>
                        <div className="item__icon">
                            <Icon type="logout"/>
                        </div>

                        <span className="nav-text">Выход</span>

                        <Link to="/user/account"/>
                    </div>

                </Sider>
                <Layout style={{marginLeft: 200}}>

                    <Header
                        className={"header__menu"}
                        style={{background: '#323BA5', padding: 0}}>
                    </Header>

                    <Content style={{margin: '80px 16px 0', overflow: 'initial'}}>
                        <div style={{padding: 24, background: '#fff', minHeight: 'calc(100vh - 11.25em)'}}>
                            {this.props.content}
                        </div>
                    </Content>

                    <Footer style={{textAlign: 'center'}}>
                        Bot Manager ©2018
                    </Footer>
                </Layout>
            </Layout>

        )
    }
}

export default MenuLeft;
