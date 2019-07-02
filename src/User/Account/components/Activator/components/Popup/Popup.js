import React from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { userActivate } from '../../../../../../thunks/user';
import { settingsUser, getUserObject } from '../../../../../../selectors/user.js';

class Popup extends React.Component {
  state = {
    visible: false,
  };

  show = () => {
    this.setState({
      visible: true
    });
  };

  hide = () => {
    this.setState({
      visible: false
    });
  };

  onOkHandler = () => {
    this.props.userActivate()
   };

  onCancelHandler = () => {
    this.hide();
  };

  render() {
    return (
      <div>

        <button
          onClick={this.show}
          className={"activator__btn"}>Активация</button>
        <Modal
          centered
          cancelText = "Не уверен"
          okText = "Уверен"
          visible={this.state.visible}
          onOk={this.onOkHandler}
          onCancel={this.onCancelHandler}>

          <div className="activator__popup">
            <div className="popup__text">
              Вы уверены что хотите заплатить <br/>
              {this.props.settings && this.props.settings.activate_price} рублей за активацию аккаунта
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getUserObject(state),
    settings: settingsUser(state),
  }
};

const mapDispatchToProps = ({
  userActivate
});

const ConnectedPopup = connect(mapStateToProps, mapDispatchToProps)(Popup);

export default ConnectedPopup