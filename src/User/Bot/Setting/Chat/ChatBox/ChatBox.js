import React, { Component } from 'react';
import InputMessage from './InputMessage'
import TypingIndicator from './TypingIndicator'
import ChatRoom from '../ChatRoom/ChatRoom'


class ChatBox extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        isLoading: false
      };
    };
  
    sendMessageLoading = (sender, senderAvatar, message) => {
      this.setState({
        isLoading: true
      });
      this.props.sendMessage(sender, senderAvatar, message);
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 400);
    };
    
    render() {
     
      return (
        <div className={"chatApp__conv"}>
          {/* <Title
            owner={this.props.owner}
          /> */}
          <ChatRoom
            botid={this.props.botid}
            owner={this.props.owner}
          />
  
          <div className={"chatApp__convSendMessage clearfix"}>
            <TypingIndicator
              owner={this.props.owner}
              isTyping={this.props.isTyping}
            />
  
            <InputMessage 
              botid={this.props.botid}
              isLoading={this.state.isLoading}
              owner={this.props.owner}
              ownerAvatar={this.props.ownerAvatar}
              sendMessage={this.props.sendMessage}
              sendMessageLoading={this.sendMessageLoading}
              typing={this.props.typing}
              resetTyping={this.props.resetTyping}
            />
          </div>
        </div>
      );
    }
  }

export default ChatBox;