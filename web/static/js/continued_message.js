import React from 'react';

class ContinuedMessage extends React.Component {
  renderBody() {
    return <div className="message__body">{this.props.message.body}</div>;
  }

  render() {
    return (
      <div className="message">
        <div className="message__gutter"></div>
        <div className="message__content">
          {this.renderBody()}
        </div>
      </div>
    );
  }
}

export default ContinuedMessage;
