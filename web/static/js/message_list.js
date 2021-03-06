import React from 'react';
import * as _ from 'lodash';
import UserMessageGroup from './user_message_group';

class MessageList extends React.Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps) {
    if (this.props.messages.length > prevProps.messages.length && this.isMinimallyScrolledUp) {
      this.scrollToBottom();
    }
  }

  get isMinimallyScrolledUp() {
    const el = this.containerEl;
    const scrollFromBot = el.scrollHeight - el.clientHeight - el.scrollTop;
    return scrollFromBot < 80;
  }

  scrollToBottom() {
    this.containerEl.scrollTop = this.containerEl.scrollHeight;
  }

  get containerEl() {
    return document.querySelector('.messagelist');
  }

  // Return arrays of arrays of Messages. Consecutive messages by the
  // same user within 10 minutes are grouped together
  get messageGroups() {
    if (_.isEmpty(this.props.messages)) { return []; }

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
    return (
      <div className="messagelist">
        {this.renderMessages()}
      </div>
    );
  }
}

export default MessageList;
