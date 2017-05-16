import React from 'react';
import MessageBody from './message_body';

class ContinuedMessage extends React.Component {
  render() {
    return (
      <div className="message">
        <div className="message__gutter"></div>
        <div className="message__content">
          <div className="message__body">
            <MessageBody body={this.props.message.body} />
          </div>
        </div>
      </div>
    );
  }
}

export default ContinuedMessage;
