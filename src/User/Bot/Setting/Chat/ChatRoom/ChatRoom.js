import React, { Component } from 'react';
import MessageItem from './MessageItem';
import {clearMessagesFromBot} from '../../../../../actions/bots';
import { connect } from 'react-redux';
import { getMessages } from '../../../../../selectors/bots';

class ChatRoom extends Component { 

  componentWillUnmount() {
      this.props.clearMessagesFromBot()
  }
    render() {
      return (        
        <div className={"chatApp__convTimeline"}>
          {this.props.messagesFromBot.slice(0).reverse().map(
            (message, index) => (
              <MessageItem
                key={index}
                owner={this.props.owner}
                sender={message.sender}
                message={message.message}/>
            )
          )}
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    messagesFromBot: getMessages(state)
  })
  const mapDispatchToProps = ({
    clearMessagesFromBot
  })

  export default ChatRoom  = connect(mapStateToProps, mapDispatchToProps)(ChatRoom);;