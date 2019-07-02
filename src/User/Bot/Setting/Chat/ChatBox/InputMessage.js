import React, { Component } from 'react';
import SendIcon from "./SendIcon";

class InputMessage extends Component {
    state = {
      textMessage: '',
      isLoading: false,
    };

    sendMessageToBlock = () => {
      let newMessageItem = {
        sender: this.props.ownerId,
        message: this.state.textMessage,
      };
      this.props.setMessage(newMessageItem);
      this.setState({textMessage: ''});
    };

    onChangeHandle = (e) => {
      this.setState({textMessage: e.target.value})
    };

    onSendMessageHandler = (event) => {
      event.preventDefault();
      let botid = this.props.botid;
      let text = this.state.textMessage;
      console.log(botid, text)
      this.props.sendMessage( botid, text );
      this.state.textMessage.length && this.sendMessageToBlock();
    };

    render() {
      /* Если сстояние чата загружается, добавляется класс */
      var loadingClass = this.isLoading ? 'chatApp__convButton--loading' : '';
      let sendButtonIcon = <SendIcon/> ;

      return (
        <form onSubmit={this.onSendMessageHandler}>
          <input
            className={"chatApp__convInput"}
            type="text"
            onChange={this.onChangeHandle}
            placeholder="Введите сообщение"
            value={this.state.textMessage}
            tabIndex="0"/>
          <div
            onClick={this.onSendMessageHandler}
            className={'chatApp__convButton ' + loadingClass}>
            {sendButtonIcon}
          </div>
        </form >
      );
    }
  }

export default InputMessage;
