import React from 'react';

const MessageItem = (props) => {
    // let date = new Date();
    let senderAvatar = ((props.owner === props.sender) ?
      <img
        className="block__message-avatar"
        src={"https://static3.depositphotos.com/1003034/155/i/450/depositphotos_1559329-stock-photo-funny-robot-stay-and-show.jpg"} alt=''/> : null);
    let messagePosition = ((props.owner === props.sender) ?
      'block__message' : 'block__message-left');
    return (
      <div className={messagePosition + " clearfix"}>
        <div className="block__message">
          {senderAvatar}
          <div>
            <div className="block__message-wrapper">
              <div className="block__message-message">
                <p className="block__message-text">
                  {props.message}
                </p>
              </div>

              {/* <div className="block__message-time">
                {format(date, 'D MMMM  HH:mm', { addSuffix: true, locale: ruLocale })}
              </div> */}
            </div>
          </div>
        </div>
      </div>
  );
};

export default MessageItem;
