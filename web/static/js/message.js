import React from 'react';
import moment from 'moment';

class Message extends React.Component {
  renderTimestamp() {
    const time = moment(this.props.message.inserted_at)
    return time.format('hh:mma');
  }

  renderBody() {
    return <div className="message__body">{this.props.message.body}</div>;
  }

  render() {
    return (
      <div className="message">
        <div className="message__avatar-container">
          {this.props.message.user_id}:
        </div>
        <div className="message__body-container">
          <div>{this.renderTimestamp()}</div>
          {this.renderBody()}
        </div>
      </div>
    );
  }
}

export default Message;
