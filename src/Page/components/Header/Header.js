import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component {
  render() {

    return (
      <div className={"container"}>
        <header className="header__main">
          <div className="main__logo">
            <Link to="/">
              <img src="/img/logo.png" alt="logo"/>
            </Link>
          </div>

          <div className="main__menu">
            <ul className={"menu__list"}>

              <li className={"header__mobile--link"}>
                <Link to="/Buy">Тарифы</Link>
              </li>

              <li className={"header__mobile--link"}>
                <Link to="/register">Регистрация</Link>
              </li>
              <li className={"header__mobile--link"}>
                <Link to="/login">Войти</Link>
              </li>
            </ul>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
