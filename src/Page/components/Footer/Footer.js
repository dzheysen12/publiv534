import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Footer extends Component {
  render() {
    return (
      <footer className="footer__main">
        <div className="container">
          <div className="footer__up">
            <div className={"footer__link"}>
              <Link to={"/"} className="logo">
                <img src="/img/logo.png" alt="Бот манеджер"/>
              </Link>

              <ul className="up__list">

                <li>
                  <Link to={"/Buy"}>Тарифы</Link>
                </li>

                {/*<li>*/}
                {/*<Link to={"/politica"}>Политика Конфиденциальности</Link>*/}
                {/*</li>*/}

                <li>
                  <Link to={"/politica"}>Пользовательское соглашение</Link>
                </li>
              </ul>

            </div>
          </div>

        </div>
      </footer>
    );
  }
}

export default Footer;
