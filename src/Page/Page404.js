import React, { Component } from 'react';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Button} from 'antd';
class Page404 extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="container">
          <div className="buy__main">
            <div className="buy__content">
              <div className="buy__content--text">
                <h1>Упс. Что-то пошло не так</h1>
              </div>
              <Button href={'/'}>Вернуться на главную</Button>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Page404;