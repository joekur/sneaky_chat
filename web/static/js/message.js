import React from 'react';

class Message extends React.Component {
  renderBody() {
    return <div className="message__body">{this.props.message.body}</div>;
  }

  renderUsername() {
    return (
      <span className="message__username">{this.props.message.user.username}</span>
    );
  }

  renderTimestamp() {
    return (
      <span className="message__timestamp"> - {this.props.message.timestamp}</span>
    );
  }

  render() {
    return (
      <div className="message">
        <div className="message__gutter">
          <div className="message__avatar">
            <img src={this.props.message.user.avatar_url} />
          </div>
        </div>
        <div className="message__content">
          <div className="message__header">
            {this.renderUsername()}{this.renderTimestamp()}
          </div>
          {this.renderBody()}
        </div>
      </div>
    );
  }
}

export default Message;
