import React, { Component } from 'react';
import InputMessage from './ChatBox/InputMessage';
import ChatRoom from './ChatRoom/ChatRoom';
import { connect } from 'react-redux';
import { setMessage } from '../../../../actions/bots';
import { sendMessage } from '../../../../thunks/bots';
import { getUserObject } from '../../../../selectors/user';

class ChatTest extends Component {

  render() {
    let ownerId = this.props.user && this.props.user._id;
    return (
      <div className={"chatApp__room"}>
          <div className={"chatApp__conv"}>
            <div className="wrap__chat--top" style={{backgroundColor: this.props.backgroundColor}}>
              <div className="chat__top--text">
                  <span className="text__component">{this.props.previewText}</span>
              </div>
            </div>

            <ChatRoom
              botid={this.props.botid}
              owner={this.props.owner}/>

            <div className={"chatApp__convSendMessage clearfix"}>
              <InputMessage
                botid={this.props.botid}
                ownerId={ownerId}
                sendMessage={this.props.sendMessage}
                setMessage={this.props.setMessage}/>
            </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: getUserObject(state)
});

const mapDispatchToProps = {
  sendMessage,
  setMessage
};

export default ChatTest = connect( mapStateToProps, mapDispatchToProps)(ChatTest);
