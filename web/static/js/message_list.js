import React from 'react';
import * as _ from 'lodash';
import UserMessageGroup from './user_message_group';

class MessageList extends React.Component {
  componentDidMount() {
    const div = document.querySelector('.messagelist');
    div.scrollTop = div.scrollHeight;
  }

  // Return arrays of arrays of Messages. Consecutive messages by the
  // same user within 10 minutes are grouped together
  get messageGroups() {
    const groups = [[]];
    let lastMessage = null;

    this.props.messages.forEach(msg => {
      if (!lastMessage || msg.isGroupableWith(lastMessage)) {
        // add to last group
        _.last(groups).push(msg);
      } else {
        // create new group
        groups.push([ msg ]);
      }
      lastMessage = msg
    })

    return groups;
  }

  renderMessages() {
    return this.messageGroups.map((group, i) =>
      <UserMessageGroup
        key={i}
        messages={group}
      />
    );
  }

  render() {
    if (_.isEmpty(this.props.messages)) { return null; }

    return (
      <div className="messagelist">
        {this.renderMessages()}
      </div>
    );
  }
}

export default MessageList;
