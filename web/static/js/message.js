import React from 'react';

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.user_id} {this.props.message.body}
      </div>
    );
  }
}

export default Message;
