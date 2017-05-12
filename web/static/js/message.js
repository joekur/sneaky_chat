import React from 'react';

class Message extends React.Component {
  renderBody() {
    return <div className="message__body">{this.props.message.body}</div>;
  }

  render() {
    return (
      <div className="message">
        <div className="message__gutter">
          <div className="message__avatar" />
        </div>
        <div className="message__content">
          <div className="message__header">
            {this.props.message.user.username} - {this.props.message.timestamp}
          </div>
          {this.renderBody()}
        </div>
      </div>
    );
  }
}

export default Message;
