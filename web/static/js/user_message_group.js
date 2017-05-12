import React from 'react';
import Message from './message';
import ContinuedMessage from './continued_message';
import * as _ from 'lodash';

class UserMessageGroup extends React.Component {
  get user() {
    return this.props.messages[0].user;
  }

  get firstMessage() {
    return this.props.messages[0];
  }

  get otherMessages() {
    return _.tail(this.props.messages);
  }

  renderFirstMessage() {
    return <Message message={this.firstMessage} />;
  }

  renderOtherMessages() {
    return this.otherMessages.map((message, i) =>
      <ContinuedMessage
        key={i}
        message={message}
      />
    );
  }

  render() {
    return (
      <div className="user-message-group">
        {this.renderFirstMessage()}
        {this.renderOtherMessages()}
      </div>
    );
  }
}

export default UserMessageGroup;
