import React, { Component } from "react";


class Item extends Component {
  state = {
    moneyMin: true
  };

  render(){
    const {moneyMin} = this.state;
    return (
      <li className={"history__item"}>
        <span className={"column item__date"}>
          05.08.2018
        </span>

        <span className={"column item__action"}>
          Пополнение
        </span>

        <span className={"column item__money"}>

          { moneyMin ?

            <span className={"plus"}>30 руб</span>
            :
            <span className={"minus"}>50 руб</span>
          }
        </span>
      </li>
    );
  };
};

export default Item;