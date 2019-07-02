import React from 'react';
import { Button, Icon } from 'antd';
import Popup from './components/Popup/Popup';


const Activator = (props) => {
    let userMoney = props.userMoney && props.userMoney;

    return (
      <div className={"activator"}>
        <div className={"activator__overlay"}>
          <span
            className={"activator__header"}>
            Для полноценной работы сервиса нужно активировать аккаунт
          </span>
          { !props.activate ? <Popup/> : null }

          { userMoney > 0 ?
              <div className="overlay__text">
                <span>
                  После активации с вашего баланса снимается
                  сумма {props.activate_price} рублей
                </span>
              </div> :
              <div className="activator__price">
                <span className={"error"}>Недостаточно средств для активации аккаунта </span>

                <Button type="dashed">
                  <Icon type="wallet" />
                  Пополнить баланс
                </Button>
              </div>
          }
        </div>
      </div>
    )

}

export default Activator;
