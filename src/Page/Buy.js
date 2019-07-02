import React, { Component } from 'react';

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Link} from "react-router-dom";

class Buy extends Component {
  render () {
    return (
      <div>
      <Header/>
        <div className="container">
        <div className="buy__main">
            <div className="buy__content">
              <div className="buy__content--text">
                <h1>
                  Установка и развертывание <br/>
                  к вам на сайт
                </h1>

                <span className={"buy__price"}>
                  15 000 руб
                </span>

                <div className="buy__content--message">
                  <span className={"message"}>Каждое сообщение: 1 руб</span>

                  <Link to="/login" className={"main__text--btn"}>
                    <span>Установить</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Buy;
