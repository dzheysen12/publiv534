import React, { Component } from "react";
import { Icon} from 'antd';
import { Link } from 'react-router-dom';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

class Main extends Component {
  render(){
    return (
      <div>
        <Header/>
        <div className="header__block">
          <div className="container">
            <div className="header__screen">

              <div className="main__text">
                <h1>Наш бот обработает <br className={"main__text--br"}/>
                    все Ваши заявки сам
                </h1>

                <Link to={"/login"} className={"main__text--btn"}>
                  <span>Начать прямо сейчас</span>
                  {/*<Icon width={"30"} height={"12"} type="arrow-right" />*/}
                </Link>

              </div>

              <div className="main__chat">
                <img src="/img/chat__img.png" alt=""/>
              </div>
            </div>
          </div>
        </div>

        <div className="automation">
          <div className="container">
            <div className="automation__content">
              <div className="content--text">
                <div>
                  <h2>100% Автоматизация</h2>

                  <p>Bot manager позволяет исключить <br/>
                     участие живых менеджеров
                  </p>
                </div>
              </div>

              <div className="content--block">
                <div className="block__create">
                  <h3>Создание</h3>

                  <p>Отправьте нам ваш прайс лист или введите <br/>
                  ваши услуги самостоятельно
                  </p>
                </div>

                <div className="block__control">
                  <h3>Ручное управление</h3>

                  <p>При желании вы можете говорить вместо бота
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="service">
          <div className="container">
            <h2>Начните обслуживать всех Ваших <br/>
                клиентов автоматически <br/>
                уже сейчас!</h2>
            <Link to="/register" className={"main__text--btn"}>
              <span>Начать</span>
              <Icon width={"30"} height={"12"} type="arrow-right" />
            </Link>
          </div>
        </div>

        <Footer/>
      </div>
    )
  }
}

export default Main;
